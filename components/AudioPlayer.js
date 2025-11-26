import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

export default function AudioPlayer({ song }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    let soundObject;

    const loadSound = async () => {
      if (song?.audioUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: song.audioUrl },
          { shouldPlay: false },
          onPlaybackStatusUpdate,
        );
        setSound(newSound);
        console.log("sound recieved");
      }
    };

    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
        setIsPlaying(status.isPlaying);
      }
    };

    loadSound();

    return () => {
      if (soundObject) soundObject.unloadAsync();
    };
  }, [song]);

  const togglePlayPause = async () => {
    if (!sound) {
      console.log("song not loaded");
      return;
    }
    const status = await sound.getStatusAsync();
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <Text style={styles.time}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={position / duration}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor="#1db954"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#1db954"
        />
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  playButton: {
    backgroundColor: "#eee",
    borderRadius: 40,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  time: {
    fontSize: 12,
    color: "#666",
    width: 40,
    textAlign: "center",
  },
});
