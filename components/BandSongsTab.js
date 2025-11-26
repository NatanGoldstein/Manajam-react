import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import SongHeader from './SongHeader';
import { songs } from '../temp_data/Songs';
import { getObjectById } from '../utils/DataHandle';

export default function BandSongsTab({ band }) {
  return (
    <View>
      <View style={styles.sectionTopLine}>
        <Text style={styles.sectionTitle}>Songs</Text>
        <TouchableOpacity>
          <Image source={require('../assets/add-icon.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.sectionContent}>
        {band.songIds.map(songId => {
          const song = getObjectById(songId, songs);
          if (!song) {
            return null;
          }
          return <SongHeader key={songId} song={song} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  sectionContent: {
    minHeight: 600,
  },
});

