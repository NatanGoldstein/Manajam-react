import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const LINE_HEIGHT = 40;

export default function ChordsLine({ header, bars }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.lineContainer}>
          {bars.map(bar => (
            <View
              key={bar.id}
              style={{ flexDirection: "row" }}
            >
              {bar.chords.map(chord => (
                <Text key={chord.id} style={styles.chord}>
                  {chord.name}
                </Text>
              ))}
              <Text style={styles.divider}>|</Text>
            </View>
          ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginVertical: LINE_HEIGHT,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  lineContainer: {
    height: LINE_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
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
  divider: {
    fontSize: 20,
    marginHorizontal: 6,
  },
});
