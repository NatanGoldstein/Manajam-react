import React, { useState, useRef, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function LyricsFullScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const song = route?.params?.song;
  const edit = route?.params?.edit ?? false;

  const name = song?.name ?? "Untitled";
  const initialLyrics = song?.lyrics ?? "";

  const [editing, setEditing] = useState(edit);
  const [text, setText] = useState(initialLyrics);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  function toggleEdit() {
    if (editing) {
      // Done pressed — for now just exit edit mode. Persist later.
      // Could call a save handler here.
    }
    setEditing((v) => !v);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.backText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
          {editing ? (
            <Text style={styles.doneText}>Done</Text>
          ) : (
            <Feather name="edit-2" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {editing ? (
          <TextInput
            style={styles.editInput}
            multiline
            value={text}
            ref={inputRef}
            onChangeText={setText}
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.lyricsText}>{text || "No lyrics available"}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 0,
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
  backText: {
    fontSize: 25,
    color: colors.black,
    paddingRight: 20,
  },
  backButton: {
    paddingTop: 20,
    zIndex: 100,
  },
  scroll: {
    padding: 20,
  },
  lyricsText: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 40,
    letterSpacing: 2,
  },
  editButton: {
    position: 'absolute',
    right: 45,
    top: 20,
    padding: 6,
  },
  doneText: {
    fontSize: 16,
    color: colors.appBlue,
    fontWeight: '600',
  },
  editInput: {
    minHeight: 200,
    fontSize: 18,
    lineHeight: 40,
    letterSpacing: 2,
    color: colors.black,
    backgroundColor: colors.white90,
    borderRadius: 8,
  },
});
