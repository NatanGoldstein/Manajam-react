import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AudioPlayer from "./AudioPlayer";

const SongHeader = ({ song }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textArea}>
        <Text style={styles.nameText}>{song.name}</Text>
        <Text style={styles.text}>{song.lastUpdate}</Text>
      </View>
      <AudioPlayer song={song} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 80,
    width: "97%",
    justifyContent: "flex-start",
    padding: 15,
    marginLeft: "1.75%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  textArea: {
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    paddingBottom: 15,
  },
});

export default SongHeader;
