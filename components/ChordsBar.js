import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const LINE_HEIGHT = 40;

export default function ChordsBar({ chords, editMode }) {
  const [chordsTemp, setChordsTemp] = useState(chords);
  const [focusedChordId, setFocusedChordId] = useState(null);

  const deleteChord = (chordId) => {
    setChordsTemp(prev =>
      prev.filter(chord => chord.id !== chordId)
    );
  };

  const renameChord = (chordId, newName) => {
    setChordsTemp(prev =>
      prev.map(chord =>
        chord.id === chordId ? { ...chord, name: newName } : chord
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
  setChordsTemp(prev => {
  // Add the new chord to the first bar (or wherever you want)
  const updated = [...prev];
  updated[0] = {
    ...updated[0],
    chords: [...updated[0].chords, newChord]
  };
    return updated;
  });
  };


  return (
    <View>
      {editMode ? (
        <View style={styles.lineContainer}>
          {chordsTemp.map(chord => (
            <View
              key={chord.id}
              style={{ flexDirection: "row" }}
            >
              <Text key={chord.id} style={styles.chord}>
                {chord.name}
              </Text>
              
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={createNewChord}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>|</Text>
        </View>
      ) : (
        <View style={styles.lineContainer}>
          {chordsTemp.map(chord => (
            <View
              key={chord.id}
              style={{ flexDirection: "row" }}
            >
              <Text key={chord.id} style={styles.chord}>
                {chord.name}
              </Text>
            </View>
          ))}
          <Text style={styles.divider}>|</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  lineContainer: {
    height: LINE_HEIGHT,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  chord: {
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: colors.appBlue,
    color: colors.white,
    padding: 3,
    borderRadius: 4,
    minWidth: 25,
    textAlign: "center",
    margin: 4,
  },
  chordLayer: {
    position: "relative",
    flexDirection: "row",
  },
  divider: {
    fontSize: 20,
    marginHorizontal: 6,
  },
  addButton: {
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
});
