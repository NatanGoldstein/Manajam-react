import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

/**
 * A functional audio player component for a given `song`.
 * 
 * Accepts: 
 *    song: {
 *      audioUrl: string   // a valid URL to an audio file
 *      ... (other song properties)
 *    }
 * 
 * This implementation should enable play/pause with UI feedback, 
 * audio seeking via slider, and resets on new song.
 */
function millisToMMSS(millis) {
  const totalSec = Math.max(0, Math.floor(millis / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function AudioPlayer({ song }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let thisSound = null;

    async function load() {
      setIsLoading(true);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      if (song?.audioUrl) {
        try {
          const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: song.audioUrl },
            { shouldPlay: false },
            (status) => {
              if (!isMounted) return;
              if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis || 1);
                setIsPlaying(status.isPlaying);
              }
            }
          );
          thisSound = newSound;
          setSound(newSound);
          setPosition(0);
          setDuration(status.durationMillis || 1);
        } catch (e) {
          // Could not load audio
          setSound(null);
        }
      }
      setIsLoading(false);
    }

    load();

    return () => {
      isMounted = false;
      if (thisSound) {
        thisSound.unloadAsync();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.audioUrl]);

  const togglePlayPause = async () => {
    if (!sound){
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
    if (!sound) return;
    await sound.setPositionAsync(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={togglePlayPause}
        style={styles.playPauseButton}
        disabled={!sound || isLoading}
      >
  <Ionicons name={isPlaying ? "pause" : "play"} size={35} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.rightSection}>
        <Slider
          style={{ width: '85%' }}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={onSliderValueChange}
          minimumTrackTintColor={colors.appBlue}
          thumbTintColor={colors.appBlue}
          disabled={!sound || isLoading}
        />
        <View style={styles.labelRow}>
          <Text style={styles.timeLabel}>{millisToMMSS(position)}</Text>
          <Text style={styles.timeLabel}>{millisToMMSS(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  playPauseButton: {
  backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    paddingTop: 15,
    width: '100%'
  },
  labelRow: {
    flexDirection: "row",
    width: '85%',
    justifyContent: "space-between",
    marginTop: 2,
  },
  timeLabel: {
    fontSize: 14,
  color: colors.darkGray,
  },
});
