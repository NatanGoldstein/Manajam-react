import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const CHAR_WIDTH = 30;
const LINE_HEIGHT = 40;

export default function LyricsChordsLine({ lyrics, chords }) {
  return (
    <View style={styles.lineContainer}>
      {/* Chord layer */}
      <View style={styles.chordLayer}>
        {chords.map(chord => (
          <Text
            key={chord.id}
            style={[
              styles.chord,
              { left: chord.charIndex * CHAR_WIDTH }
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
  );
};


const styles = StyleSheet.create({
  lineContainer: {
    position: "relative",
    paddingTop: 18, // space for chords
    height: LINE_HEIGHT + 20,
  },

  chordLayer: {
    position: "absolute",
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
    padding: 3,
    borderRadius: 4,
    minWidth: 25,
    textAlign: "center",
  },
  lyrics: {
    fontSize: 18,
    letterSpacing: 3,
    paddingTop: 4,
  },
});
