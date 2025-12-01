import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getObjectById } from "../utils/DataHandle";
import { bands } from "../temp_data/Bands";
import { appBlue } from "../constants/colors";

export default function NewSongScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { song, state } = route.params;
  const bandId = song.bandId;
  const band = getObjectById(bandId, bands);
  const [name, setName] = useState();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [lyricsFile, setLyricsFile] = useState();
  const [sheets, setSheets] = useState([]);
  const [showFloatingWindow1, setShowFloatingWindow1] = useState(false);
  const [showFloatingWindow2, setShowFloatingWindow2] = useState(false);
  const [showFloatingWindow3, setShowFloatingWindow3] = useState(false);

  function handleState() {
    if (state == "edit") {
      setLastUpdate(song.lastUpdate);
      setName(song.name);
      setLyricsFile(song.lyricsFile);
      setSheets(song.sheets);
    }
  }

  function handleSubmit() {
    alert("Submitting...");
    // Placeholder — will connect to backend later
  }

  useFocusEffect(
    useCallback(() => {
      handleState();
    }, []),
  );

  function isInSheets(songId) {
    return sheets.some((id) => id === songId);
  }

  const handlesheet = (songId) => {
    if (isInSheets(songId)) {
      setSheets((prev) => prev.filter((id) => id !== songId));
    } else {
      setSheets((prev) => [...prev, songId]);
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
          {state == "new" ? "New Song" : "Edit Song"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          style={styles.input}
          placeholder="Song Name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.block}>
              <View style={styles.row2}>
                <Text style={styles.header}>Audio File</Text>
                <TouchableOpacity onPress={() => setShowFloatingWindow1(!showFloatingWindow1)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
        </View>
        <View style={styles.block}>
              <View style={styles.row2}>
                <Text style={styles.header}>Lyrics</Text>
                <TouchableOpacity onPress={() => setShowFloatingWindow2(!showFloatingWindow2)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
        </View>
        <View style={styles.block}>
            {sheets.length === 0 ? (
              <View style={styles.row2}>
                <Text style={styles.header}>Sheets</Text>
                <TouchableOpacity onPress={() => setShowFloatingWindow3(!showFloatingWindow3)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
            ):(
              <View style={styles.row2}>
                <TouchableOpacity onPress={() => setSheets([])}>
                  <Ionicons name="close-circle" size={30} />
                </TouchableOpacity>
                <Text style={styles.selectedHeader} color={`${appBlue}`}>Sheets({sheets.length})</Text>
                <TouchableOpacity onPress={() => setShowFloatingWindow3(!showFloatingWindow3)}>
                  <Ionicons name={"add-circle"} size={30} />
                </TouchableOpacity>
              </View>
            )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {state == "new" ? "Create" : "Update"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Floating window1 overlay, only show when showFloatingWindow1 is true */}
      {showFloatingWindow1 && (
        <View style={[styles.floatingWindow, {right: 30, top: 195}]}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="folder-open-outline" size={22} color="#444" style={{ marginRight: 6 }} />
            <Text style={styles.floatingButtonText}>Upload File</Text>
          </TouchableOpacity>
          <View style={[styles.floatingButton, { flexDirection: 'row', alignItems: 'center' }]}>
            <Ionicons name="link-outline" size={22} color="#444" marginRight={5} />
            <TextInput
              style={[styles.floatingButtonText, {width: '85%'}]}
              placeholder="Paste link"
              autoCorrect={false}
            />
          </View>
        </View>
      )}
      {showFloatingWindow2 && (
        <View style={[styles.floatingWindow, {right: 30, top: 275}]}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="folder-open-outline" size={22} color="#444" style={{ marginRight: 6 }} />
            <Text style={styles.floatingButtonText}>Upload File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="add-circle-outline" size={22} color="#444" marginRight={5} />
            <Text style={styles.floatingButtonText}>Create New File</Text>
          </TouchableOpacity>
        </View>
      )}
      {showFloatingWindow3 && (
        <View style={[styles.floatingWindow, {right: 30, top: 360}]}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="folder-open-outline" size={22} color="#444" style={{ marginRight: 6 }} />
            <Text style={styles.floatingButtonText}>Upload File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="add-circle-outline" size={22} color="#444" marginRight={5} />
            <Text style={styles.floatingButtonText}>Create New File</Text>
          </TouchableOpacity>
        </View>
      )}
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
    color: "#333",
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
    color: `${appBlue}`
  },
  backText: {
    fontSize: 25,
    color: "#000",
    paddingRight: 20,
  },
  backButton: {
    paddingTop: 20,
    zIndex: 100,
  },
  block: {
    backgroundColor: "rgba(255, 255, 255, 0.68)",
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
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    padding: 12,
    fontSize: 20,
    marginBottom: 15,
  },
  timeInput: {
    width: 120,
    height: 40,
    borderRadius: 7,
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "rgba(215, 215, 215, 0.55)",
  },
  button: {
    backgroundColor: "rgba(13, 3, 3, 0.9)",
    width: 200,
    padding: 15,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    margin: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  floatingWindow: {
    position: "absolute",
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    alignItems: "center",
    zIndex: 9999,
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 14,
    marginVertical: 5,
  },
  floatingButtonText: { 
    color: "#222", 
    fontWeight: "500" 
  },

});
