import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { useState } from 'react';
import DraggableChord from './DraggableChord';

const CHAR_WIDTH = 35;
const LINE_HEIGHT = 60;

export default function LyricsChordsLine({ 
  lineIndex, lyrics, chords, 
  editMode, scrollToggle, updateLyricsLine, 
  updateLineChords, deleteLyricsLine, createLyricsLine,
  lyricsFocusTarget, onLyricsFocusHandled
}) {
  const [lyricsTemp, setLyricsTemp] = useState(lyrics);
  const [chordsTemp, setChordsTemp] = useState(chords);
  const [focusedChordId, setFocusedChordId] = useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (lyricsFocusTarget && lyricsFocusTarget.blockId && lyricsFocusTarget.lineIndex === lineIndex) {
      setTimeout(() => {
        inputRef.current?.focus?.();
        onLyricsFocusHandled?.();
      }, 80);
    }
  }, [lyricsFocusTarget]);

  const moveChord = (chordId, newCharIndex) => {
    setChordsTemp(prev =>
      prev.map(chord =>
        chord.id === chordId
          ? { ...chord, charIndex: newCharIndex }
          : chord
        )
      );
  };

  const deleteChord = (chordId) => {
    setChordsTemp(prev => prev.filter(c => c.id !== chordId));
  };

  const renameChord = (chordId, newName) => {
    setChordsTemp(prev =>
      prev.map(chord =>
        chord.id === chordId
          ? { ...chord, name: newName }
          : chord
      )
    );
  };

  const createNewChord = () => {
    // place new chord at right of the rightmost chord
    const maxIndex = chordsTemp.reduce((max, c) => Math.max(max, c.charIndex), -1);
  // limit: do not create if rightmost is at or beyond 8
  if (maxIndex >= 8) return;
    const newCharIndex = Math.max(0, maxIndex + 1);
    const newChord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
      name: '',
      lineIndex: 0,
      charIndex: newCharIndex,
    };
  setChordsTemp(prev => [...prev, newChord]);
  // focus the new chord's input
  setFocusedChordId(newChord.id);
  };

  // commit local changes when editMode transitions from true -> false
  const prevEditRef = React.useRef(editMode);
  React.useEffect(() => {
    if (prevEditRef.current && !editMode) {
      // commit lyrics
      if (typeof updateLyricsLine === 'function') {
        updateLyricsLine(lineIndex, lyricsTemp);
      }
      // commit chords
      if (typeof updateLineChords === 'function') {
        updateLineChords(chordsTemp);
      }
    }
    prevEditRef.current = editMode;
  }, [editMode]);

  return (
    <View>
      {editMode ? (
        <View style={styles.lineContainer}>
          <View style={styles.chordLayer}>
            {chordsTemp.map(chord => (
              <DraggableChord
                key={chord.id}
                chord={chord}
                draggable={true}
                onMove={moveChord}
                onChangeName={renameChord}
                onDragStart={() => scrollToggle(false)}
                onDragEnd={() => scrollToggle(true)}
                onDelete={deleteChord}
                autoFocus={chord.id === focusedChordId}
              />
            ))}
            {/* Add new chord button to the right of the rightmost chord */}
            {(() => {
              const maxIndex = chordsTemp.reduce((max, c) => Math.max(max, c.charIndex), -1);
              const canAdd = maxIndex < 8;
              return (
                <TouchableOpacity
                  disabled={!canAdd}
                  style={[styles.addButton, { right: 5 }, !canAdd && styles.addButtonDisabled]}
                  onPress={createNewChord}
                >
                  <Text style={[styles.addButtonText, !canAdd && styles.addButtonTextDisabled]}>+</Text>
                </TouchableOpacity>
              );
            })()}
          </View>
          <TextInput
            ref={inputRef}
            style={styles.lyrics}
            value={lyricsTemp}
            onChangeText={text => setLyricsTemp(text)}
            onSubmitEditing={() => {
              // create a new line right after this one
              if (typeof createLyricsLine === 'function') {
                createLyricsLine('', lineIndex);
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && (lyricsTemp ?? '') === '') {
                // delete this line
                if (typeof deleteLyricsLine === 'function') {
                  deleteLyricsLine(lineIndex);
                }
              }
            }}
          />
        </View>
      ):(
        <View style={styles.lineContainer}>
        <View style={styles.chordLayer}>
          {chords.map(chord => (
            <Text
              key={chord.id}
              style={[
                styles.chord,
                { left: chord.charIndex * CHAR_WIDTH },
              ]}
            >
              {chord.name}
            </Text>
          ))}
        </View>

        {/* Lyrics */}
        <Text style={styles.lyrics}>
          {lyrics}
        </Text>
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  lineContainer: {
    position: "relative",
    paddingTop: 20, // space for chords
    height: LINE_HEIGHT,
  },

  chordLayer: {
    position: "relative",
    top: 0,
    left: 0,
    height: 20,
    width: "100%",
  },

  chord: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: colors.appBlue,
    color: colors.white,
    padding: 5,
    borderRadius: 4,
    minWidth: 25,
    textAlign: "center",
  },
  lyrics: {
    fontSize: 18,
    letterSpacing: 4,
    paddingTop: 4,
  },
  addButton: {
    position: 'absolute',
    top: 0,
    width: 30,
    height: 25,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.appBlueFaded,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: colors.appBlueFaded,
    fontSize: 18,
    lineHeight: 20,
  },
  addButtonDisabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  addButtonTextDisabled: {
    color: colors.placeholderDark32,
  },
});
