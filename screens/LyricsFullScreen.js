import React, { useState, useRef, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import ChordsBar from "../components/ChordsBar";
import LyricsChordsLine from "../components/LyricsChordsLine";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

export default function LyricsFullScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const song = route?.params?.song;
  const [blocksTemp, setBlocksTemp] = useState(song?.blocks ?? []);
  const edit = route?.params?.edit ?? false;

  const name = song?.name ?? "Untitled";
  const initialLyrics = song?.lyrics ?? "";

  const [editing, setEditing] = useState(edit);
  const [text, setText] = useState(initialLyrics);
  const [showFloating, setShowFloating] = useState(false);
  const inputRef = useRef(null);
  const [lyricsFocusTarget, setLyricsFocusTarget] = useState(null);
  
  const [enableScroll, setEnableScroll] = useState(true);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  // --- Block edit helpers ---
  const createNewLyricsChordsBlock = (header = 'New Section') => {
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

    setBlocksTemp(prev => [...prev, newBlock]);
  };

  const createNewChordsBlock = (header = 'New Chords Section') => {
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

    setBlocksTemp(prev => [...prev, newBlock]);
  };



  // Update an existing bar by blockId and barId
  const updateBar = (blockId, barId, newBar) => {
    setBlocksTemp(prev => prev.map(block => {
      if (block.id !== blockId) return block;
      return {
        ...block,
        bars: block.bars.map(b => b.id === barId ? { ...b, ...newBar } : b)
      };
    }));
  };

  // Create a new bar inside a block (appends to bars)
  const createBar = (blockId, barData) => {
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
  const deleteBar = (blockId, barId) => {
    setBlocksTemp(prev => prev.map(block => {
      if (block.id !== blockId) return block;
      return { ...block, bars: (block.bars || []).filter(b => b.id !== barId) };
    }));
  };

  // Update an existing lyrics line inside a lyricsChords block (by index)
  const updateLyricsLine = (blockId, lineIndex, newText) => {
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
  const updateLineChords = (blockId, lineIndex, newChords) => {
    setBlocksTemp(prev => prev.map(block => {
      if (block.id !== blockId) return block;
      const remaining = (block.chords || []).filter(c => c.lineIndex !== lineIndex);
      const normalized = (newChords || []).map(c => ({ ...c, lineIndex }));
      return { ...block, chords: [...remaining, ...normalized] };
    }));
  };

  // Create a new lyrics line inside a lyricsChords block (append or insert)
  // If insertIndex is provided, insert the new line after insertIndex
  const createLyricsLine = (blockId, lineText = '', insertIndex = null) => {
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
  const deleteLyricsLine = (blockId, lineIndex) => {
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
  const updateBlockHeader = (blockId, newHeader) => {
    setBlocksTemp(prev =>
      prev.map(block =>
        block.id === blockId
          ? { ...block, header: newHeader }
          : block
      )
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.backText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          {editing ? (
            <Text style={styles.doneText}>Done</Text>
          ) : (
            <Feather name="edit-2" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView 
        contentContainerStyle={styles.scroll} 
        scrollEnabled={enableScroll}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        {blocksTemp.map(block => 
          <View key={block.id} style={{marginBottom: 40}}>
            {editing ? 
              <TextInput 
                style={styles.header} 
                value={block.header}
                onChangeText={text => updateBlockHeader(block.id, text)}
              />
              :
              <Text style={styles.header}>{block.header}</Text>
            }
            {block.type === 'lyricsChords' ? (
              <View>
                {block.lyrics.map((line, lineIndex) => (
                  <LyricsChordsLine
                    key={line.key}
                    lineIndex={lineIndex}
                    lyrics={line.text}
                    chords={block.chords.filter(chord => chord.lineIndex === lineIndex)}
                    editMode={editing}
                    scrollToggle={setEnableScroll}
                    // commit helpers
                    updateLyricsLine={(idx, newLine) => updateLyricsLine(block.id, idx, newLine)}
                    createLyricsLine={(text, insertIndex = null) => createLyricsLine(block.id, text, insertIndex)}
                    deleteLyricsLine={(idx) => deleteLyricsLine(block.id, idx)}
                    updateLineChords={(newChords) => updateLineChords(block.id, lineIndex, newChords)}
                    lyricsFocusTarget={lyricsFocusTarget}
                    onLyricsFocusHandled={() => setLyricsFocusTarget(null)}
                  />))}
              </View>
              ) : (
                <View>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {block.bars.map(bar => (
                      <ChordsBar
                        key={bar.id}
                        chords={bar.chords}
                        editMode={editing}
                        setChords={setBlocksTemp}
                        // commit helpers
                        updateBar={(newBar) => updateBar(block.id, bar.id, newBar)}
                        createBar={(barData) => createBar(block.id, barData)}
                        deleteBar={() => deleteBar(block.id, bar.id)}
                      />
                    ))}
                    {editing && (
                      <TouchableOpacity style={styles.addBarButton} onPress={() => createBar(block.id, {})}>
                        <Text style={styles.addButtonText}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )
            }
            </View>
          )}
          {editing && (
            <TouchableOpacity style={styles.addSectionButton} onPress={() => setShowFloating(!showFloating)}>
              <Text style={styles.addSectionText}>+ Add new section</Text>
            </TouchableOpacity>)}
          {showFloating && (
            <View style={styles.floatingWindow}>
              <TouchableOpacity style={styles.floatingButton} onPress={() => { createNewLyricsChordsBlock() }}>
                <Text style={styles.floatingButtonText}>Lyrics & Chords</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity style={styles.floatingButton} onPress={() => { createNewChordsBlock() }}>
                <Text style={styles.floatingButtonText}>Chords</Text>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 0,
    height: 50,
    marginBottom: 20,
    zIndex: 50,
  },
  headerTitle: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  backText: {
    fontSize: 25,
    color: colors.black,
    paddingRight: 20,
  },
  backButton: {
    paddingTop: 20,
    zIndex: 100,
  },
  scroll: {
    padding: 20,
    minHeight: '100%',
  },
  lyricsText: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 40,
    letterSpacing: 2,
  },
  editButton: {
    position: 'absolute',
    right: 45,
    top: 20,
    padding: 6,
  },
  doneText: {
    fontSize: 16,
    color: colors.appBlue,
    fontWeight: '600',
  },
  editInput: {
    minHeight: 200,
    fontSize: 18,
    lineHeight: 40,
    letterSpacing: 2,
    color: colors.black,
    backgroundColor: colors.white90,
    borderRadius: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  addSectionButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addSectionText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  floatingWindow: {
    width: '50%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    alignItems: "center",
    zIndex: 9999,
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: '80%',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: colors.darkGray,
    fontWeight: "500",
    fontSize: 16,
  },
  line: {
    width: '104%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  floatingClose: {
    marginTop: 8,
  },
  floatingCloseText: {
    color: colors.appBlue,
    fontWeight: '600',
  },
  addBarButton: {
    width: 70,
    height: 25,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: colors.mediumGray,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: colors.mediumGray,
    fontSize: 18,
    lineHeight: 20,
  },
});
