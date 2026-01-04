import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { songs } from "../temp_data/Songs";
import { getObjectById } from "../utils/DataHandle";
import { bands } from "../temp_data/Bands";
import Collapsible from "react-native-collapsible";
import { selectionAsync } from "expo-haptics";
import colors from "../constants/colors";

export default function NewEventScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const endTimeRef = useRef(null);
  const [collapsed, setCollapsed] = useState(true);
  const { event, state } = route.params;
  const bandId = event.bandId;
  const band = getObjectById(bandId, bands);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [topic, setTopic] = useState();
  const [location, setLocation] = useState();
  const [songList, setSongList] = useState([]);

  function handleState() {
    if (state == "edit") {
      setDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setTopic(event.topic);
      setLocation(event.location);
      setSongList(event.songsList);
    }
  }

  function handleSubmit() {
    alert("Submitting...");
    // Placeholder — will connect to backend later
  }

  function handleStartTimeChange(text) {
    let cleaned = text.replace(/[^0-9:]/g, "");

    // Auto-insert colon
    if (cleaned.length === 2 && !cleaned.includes(":")) {
      cleaned = cleaned + ":";
    }

    // Max 5 chars
    if (cleaned.length > 5) cleaned = cleaned.slice(0, 5);

    setStartTime(cleaned);

    // Jump to next input when full
    if (cleaned.length === 5) {
      endTimeRef.current?.focus();
    }
  }

  function handleEndTimeChange(text) {
    let cleaned = text.replace(/[^0-9:]/g, "");

    // Auto-insert colon
    if (cleaned.length === 2 && !cleaned.includes(":")) {
      cleaned = cleaned + ":";
    }

    // Max 5 chars
    if (cleaned.length > 5) cleaned = cleaned.slice(0, 5);

    setEndTime(cleaned);

    // Jump to next input when full
    if (cleaned.length === 5) {
      endTimeRef.current?.blur();
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleState();
    }, []),
  );

  function isInSongs(songId) {
    return songList.some((id) => id === songId);
  }

  const handleSong = (songId) => {
    if (isInSongs(songId)) {
      setSongList((prev) => prev.filter((id) => id !== songId));
    } else {
      setSongList((prev) => [...prev, songId]);
    }
  };

  return (
    <View>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.backText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {state == "new" ? "New Event" : "Edit event"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          style={styles.input}
          placeholder="Event Topic"
          value={topic}
          onChangeText={setTopic}
        />
        <View style={styles.block}>
          <Ionicons style={styles.icon} name={"calendar-outline"} size={30} />
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setDate(selectedDate);
            }}
          />
          <View style={styles.row1}>
            <Text width={110}>From</Text>
            <Text>To </Text>
          </View>
          <View style={styles.row1}>
            <TextInput
              value={startTime}
              style={styles.timeInput}
              placeholder="00:00"
              onChangeText={handleStartTimeChange}
              keyboardType="number-pad"
              maxLength={5}
            />
            <Text>-</Text>
            <TextInput
              value={endTime}
              ref={endTimeRef}
              style={styles.timeInput}
              placeholder="00:00"
              onChangeText={handleEndTimeChange}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
        </View>
        <TextInput
          value={location}
          style={styles.input}
          placeholder="Location"
          onChangeText={setLocation}
        />
        <View style={styles.block}>
            {songList.length === 0 ? (
              <View style={styles.row2}>
                <Text style={styles.header}>Songs</Text>
                <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
            ):(
              <View style={styles.row2}>
                <TouchableOpacity onPress={() => setSongList([])}>
                  <Ionicons name="close-circle" size={30} />
                </TouchableOpacity>
                <Text style={styles.selectedHeader} color={`${colors.appBlue}`}>Songs</Text>
                <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            
         
          <Collapsible collapsed={collapsed}>
            <ScrollView style={styles.drawer}>
              {band.songIds.map((songId) => {
                const song = getObjectById(songId, songs);
                return (
                  <TouchableOpacity onPress={() => handleSong(songId)}>
                    <Text style={styles.songs}>
                      {isInSongs(songId)
                        ? `☑   ${song.name}`
                        : `⬚   ${song.name}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Collapsible>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {state == "new" ? "Create" : "Update"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 15,
    paddingBottom: 60,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    zIndex: 50,
  },
  headerTitle: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  color: colors.darkGray,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.appBlue,
  },
  backText: {
    fontSize: 25,
  color: colors.black,
    paddingRight: 20,
  },
  backButton: {
    paddingTop: 20,
    zIndex: 100,
  },
  block: {
  backgroundColor: colors.white68,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    maxHeight: 400,
  },
  row1: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10,
  },
  row2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  songs: {
    alignSelf: "flex-start",
    fontSize: 15,
    margin: 5,
  },
  drawer: {
    width: 320,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
  backgroundColor: colors.white,
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  timeInput: {
    width: 120,
    height: 40,
    borderRadius: 7,
    textAlign: "center",
    fontSize: 17,
  backgroundColor: colors.overlayGray55,
  },
  button: {
    backgroundColor: colors.black,
    width: 200,
    padding: 15,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    margin: 30,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 18,
  },
});
