import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';


const LyricsFilePriview = ({ file }) => {
    const navigation = useNavigation();
    const lyrics =  file.blocks.filter(block => block.type === 'lyricsChords').flatMap(block => block.lyrics);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("LyricsFull", { lyricsFileId: file.id, edit: false })}
        >
            <Text style={styles.header}>{file.name}</Text>
            {lyrics.slice(0, 6).map(line => (
                <Text key={line.key} style={styles.lyricsText}>{line.text}</Text>
            ))}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    height: 120,
    width: 90,
    overflow: 'hidden',
  },
  header: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  lyricsText: {
    fontSize: 5,
    color: colors.darkGray,
    lineHeight: 13,
  },
});

export default LyricsFilePriview;