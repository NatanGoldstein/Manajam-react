import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { myLyricsFiles } from "../local_data/Files";
import { mySheetFiles } from "../local_data/Files";
import { useNavigation } from "@react-navigation/native";

export default function MyFilesScreen() {
  const navigation = useNavigation();

  const lyricsFiles = myLyricsFiles;
  const sheetFiles = mySheetFiles;

  const handleCreateLyrics = () => {
    navigation.navigate("NewSongScreen", { song: {}, state: "new" });
  };

  const handleCreateSheet = () => {
    navigation.navigate("NewSongScreen", { song: {}, state: "new" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>My Files</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lyrics & Chords Files</Text>
            <TouchableOpacity onPress={handleCreateLyrics}>
              <Ionicons name="add-circle" size={28} color={colors.black} />
            </TouchableOpacity>
          </View>

          {lyricsFiles.length === 0 ? (
            <Text style={styles.empty}>No lyrics files</Text>
          ) : (
            lyricsFiles.map(file => (
              <View key={file.id} style={styles.itemRow}>
                <Text style={styles.itemText}>{file.name}</Text>
                <Text style={styles.itemDate}>{file.lastUpdate}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sheets</Text>
            <TouchableOpacity onPress={handleCreateSheet}>
              <Ionicons name="add-circle" size={28} color={colors.black} />
            </TouchableOpacity>
          </View>

          {sheetFiles.length === 0 ? (
            <Text style={styles.empty}>No sheets</Text>
          ) : (
            sheetFiles.map(file => (
              <View key={`${file.id}-sheet`} style={styles.itemRow}>
                <Text style={styles.itemText}>{file.name}</Text>
                <Text style={styles.itemDate}>{file.lastUpdate}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.white 
    },
    topBar: { 
        height: 50, 
        justifyContent: "center" 
    },
    headerTitle: { 
        alignSelf: "center", 
        fontSize: 22, 
        fontWeight: "bold", 
        color: colors.black 
    },
    scroll: { 
        padding: 20 
    },
    section: { 
        marginBottom: 28 
    },
    sectionHeader: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 12 
    },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: "700", 
        color: colors.black 
    },
    empty: { 
        color: colors.mediumGray, 
        fontStyle: "italic" 
    },
    itemRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingVertical: 10, 
    },
    itemText: { 
        fontSize: 16, 
        color: colors.black,
    },
    itemDate: { 
        fontSize: 12, 
        color: colors.mediumGray 
    },
});
