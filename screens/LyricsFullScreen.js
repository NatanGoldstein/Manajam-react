import React, { useState, useRef, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import ChordsBar from "../components/ChordsBar";
import LyricsChordsLine from "../components/LyricsChordsLine";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LyricsFullScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const song = route?.params?.song;
  const edit = route?.params?.edit ?? false;

  const name = song?.name ?? "Untitled";
  const initialLyrics = song?.lyrics ?? "";

  const [editing, setEditing] = useState(edit);
  const [text, setText] = useState(initialLyrics);
  const [showFloating, setShowFloating] = useState(false);
  const inputRef = useRef(null);
  
  const [enableScroll, setEnableScroll] = useState(true);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          {editing ? (
            <Text style={styles.doneText}>Done</Text>
          ) : (
            <Feather name="edit-2" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} scrollEnabled={enableScroll}>
          {song.blocks.map(block => 
            block.type === 'lyricsChords' ? (
              <View key={block.id} style={{marginBottom: 40}}>
                <Text style={styles.header}>{block.header}</Text>
                {block.lyrics.map((line, lineIndex) => (
                  <LyricsChordsLine
                    key={lineIndex}
                    lyrics={line}
                    chords={block.chords.filter(chord => chord.lineIndex === lineIndex)}
                    editMode={editing}
                    scrollToggle={setEnableScroll}
                  />))}
              </View>
              ) : (
                <View key={block.id}>
                  <Text style={styles.header}>{block.header}</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {block.bars.map(bar => (
                      <ChordsBar
                        key={bar.id}
                        chords={bar.chords}
                        editMode={editing}
                      />
                    ))}
                  </View>
                </View>
              )
          )}
          {editing && (
            <TouchableOpacity style={styles.addSectionButton} onPress={() => setShowFloating(!showFloating)}>
              <Text style={styles.addSectionText}>+ Add new section</Text>
            </TouchableOpacity>)}
          {showFloating && (
            <View style={styles.floatingWindow}>
              <TouchableOpacity style={styles.floatingButton} onPress={() => { /* add Lyrics and Chords */ }}>
                <Text style={styles.floatingButtonText}>Lyrics & Chords</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity style={styles.floatingButton} onPress={() => { /* add Chords */ }}>
                <Text style={styles.floatingButtonText}>Chords</Text>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
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
    minHeight: '100%',
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
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  addSectionButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addSectionText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  floatingWindow: {
    width: '50%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    shadowColor: colors.black,
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
    marginVertical: 5,
    width: '80%',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: colors.darkGray,
    fontWeight: "500",
    fontSize: 16,
  },
  line: {
    width: '104%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginVertical: 8,
  },
  floatingClose: {
    marginTop: 8,
  },
  floatingCloseText: {
    color: colors.appBlue,
    fontWeight: '600',
  },
});
