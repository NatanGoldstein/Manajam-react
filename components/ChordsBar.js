import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import DraggableChord from './DraggableChord';

const LINE_HEIGHT = 40;

export default function ChordsBar({ chords, editMode, updateBar, deleteBar, blockId, barId }) {
  const [chordsTemp, setChordsTemp] = useState(chords);
  const [focusedChordId, setFocusedChordId] = useState(null);

  // commit chordsTemp to parent when editMode ends (true -> false)
  const prevEditRef = useRef(editMode);
  useEffect(() => {
    if (prevEditRef.current && !editMode) {
      // commit
      if (typeof updateBar === 'function') {
        updateBar({ chords: chordsTemp });
      }
    }
    prevEditRef.current = editMode;
  }, [editMode]);

  const deleteChord = (chordId) => {
    setChordsTemp(prev =>
      prev.filter(chord => chord.id !== chordId)
    );
  };

  // double-tap detection for delete
  const lastTap = useRef(0);
  const tapTimeout = useRef(null);
  useEffect(() => {
    return () => {
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
    };
  }, []);

  const renameChord = (chordId, newName) => {
    setChordsTemp(prev =>
      prev.map(chord =>
        chord.id === chordId ? { ...chord, name: newName } : chord
      )
    );
  };


  const createNewChord = () => {
    const newChord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
      name: '',
    };
    setChordsTemp(prev => [...prev, newChord]);
    // focus the new chord's input
    setFocusedChordId(newChord.id);
  };

  // watch for empty bar and auto-delete when chords become zero
  const prevCountRef = useRef(chordsTemp.length);
  useEffect(() => {
    const prev = prevCountRef.current;
    const now = chordsTemp.length;
    if (prev > 0 && now === 0) {
      if (typeof deleteBar === 'function') {
        deleteBar(blockId, barId);
      }
    }
    prevCountRef.current = now;
  }, [chordsTemp]);


  return (
    <View>
      {editMode ? (
        <View style={styles.lineContainer}>
          {chordsTemp.map(chord => (
              <DraggableChord
                key={chord.id}
                chord={chord}
                draggable={false}
                onChangeName={renameChord}
                onDelete={deleteChord}
                autoFocus={chord.id === focusedChordId}
              />
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
    flexDirection: "row",
    alignItems: "center",
    height: LINE_HEIGHT,
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
    marginRight: 4,
  },
  chordLayer: {
    position: "relative",
    flexDirection: "row",
  },
  divider: {
    fontSize: 20,
    marginRight: 4,
  },
  addButton: {
    width: 30,
    height: 25,
    marginRight: 4,
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
