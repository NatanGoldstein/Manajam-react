
// --- Block edit helpers ---
const createNewLyricsChordsBlock = (header = '', setShowFloating, setBlocksTemp) => {
    const blockId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-lc`;

    const newBlock = {
        id: blockId,
        type: 'lyricsChords',
        header,
        lyrics: [
        {
            key: `${Date.now()}-l`,
            text: '',
        },
        ],
        chords: [],
    };

    setShowFloating(false);
    setBlocksTemp(prev => [...prev, newBlock]);
};

const createNewChordsBlock = (header = '', setShowFloating, setBlocksTemp) => {
    const blockId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-c`;
    const barId = `${Date.now()}-b`;

    const newBlock = {
        id: blockId,
        type: 'Chords',
        header,
        bars: [
        {
            id: barId,
            chords: [],
        },
        ],
    };

    setShowFloating(false);
    setBlocksTemp(prev => [...prev, newBlock]);
};



// Update an existing bar by blockId and barId
const updateBar = (blockId, barId, newBar, setBlocksTemp) => {
    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        return {
        ...block,
        bars: block.bars.map(b => b.id === barId ? { ...b, ...newBar } : b)
        };
    }));
};

// Create a new bar inside a block (appends to bars)
const createBar = (blockId, barData, setBlocksTemp) => {
    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        const newBar = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
        chords: barData?.chords ?? [{id: "1", name: ""}],
        ...barData,
        };
        return { ...block, bars: [...(block.bars || []), newBar] };
    }));
};

// Delete a bar by blockId and barId
const deleteBar = (blockId, barId, setBlocksTemp) => {
    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        return { ...block, bars: (block.bars || []).filter(b => b.id !== barId) };
    }));
};

// Update an existing lyrics line inside a lyricsChords block (by index)
const updateLyricsLine = (blockId, lineIndex, newText, setBlocksTemp) => {
    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        if (!block.lyrics) return block;
        const lyrics = [...block.lyrics];
        const prevKey = lyrics[lineIndex]?.key ?? `${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
        lyrics[lineIndex] = { key: prevKey, text: newText };
        return { ...block, lyrics };
    }));
};

// Update chords for a specific lyrics line inside a lyricsChords block
const updateLineChords = (blockId, lineIndex, newChords, setBlocksTemp) => {
    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        const remaining = (block.chords || []).filter(c => c.lineIndex !== lineIndex);
        const normalized = (newChords || []).map(c => ({ ...c, lineIndex }));
        return { ...block, chords: [...remaining, ...normalized] };
    }));
};

// Create a new lyrics line inside a lyricsChords block (append or insert)
// If insertIndex is provided, insert the new line after insertIndex
const createLyricsLine = (blockId, lineText = '', insertIndex = null, setBlocksTemp, setLyricsFocusTarget) => {
    const newKey = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-l`;

    setBlocksTemp(prev => prev.map(block => {
        if (block.id !== blockId) return block;

        const lyrics = [...(block.lyrics || [])];
        const chords = [...(block.chords || [])];

        const newLineObj = { key: newKey, text: lineText };

        let insertAt;
        if (insertIndex === null || insertIndex < 0 || insertIndex >= lyrics.length) {
        insertAt = lyrics.length;
        lyrics.push(newLineObj);
        } else {
        insertAt = insertIndex + 1;
        lyrics.splice(insertAt, 0, newLineObj);
        }

        // Shift chords that belong to lines AFTER the insertion point
        const shiftedChords = chords.map(c =>
        c.lineIndex >= insertAt ? { ...c, lineIndex: c.lineIndex + 1 } : c
        );

        return {
        ...block,
        lyrics,
        chords: shiftedChords,
        };
    }));

    // focus handling (if inserted in middle)
    if (insertIndex !== null && insertIndex >= 0) {
        setLyricsFocusTarget({ blockId, lineIndex: insertIndex + 1 });
    }
};


// Delete a lyrics line and remove/shift chords accordingly
const deleteLyricsLine = (blockId, lineIndex, setBlocksTemp) => {
    setBlocksTemp(prev =>
        prev.map(block => {
        if (block.id !== blockId) return block;
        if (!block.lyrics || lineIndex < 0 || lineIndex >= block.lyrics.length) {
            return block;
        }

        // Remove lyric line
        const lyrics = [...block.lyrics];
        lyrics.splice(lineIndex, 1);

        // Remove chords on this line + shift following lines up
        const chords = (block.chords || [])
            .filter(chord => chord.lineIndex !== lineIndex)
            .map(chord =>
            chord.lineIndex > lineIndex
                ? { ...chord, lineIndex: chord.lineIndex - 1 }
                : chord
            );

        return {
            ...block,
            lyrics,
            chords,
        };
        })
    );
};

// Update header for a specific block
const updateBlockHeader = (blockId, newHeader, setBlocksTemp) => {
    setBlocksTemp(prev =>
        prev.map(block =>
        block.id === blockId
            ? { ...block, header: newHeader }
            : block
        )
    );
};

export {
    createNewLyricsChordsBlock,
    createNewChordsBlock,
    updateBar,
    createBar,
    deleteBar,
    updateLyricsLine,
    updateLineChords,
    createLyricsLine,
    deleteLyricsLine,
    updateBlockHeader,
};