import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import AudioPlayer from "../components/AudioPlayer";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SongScreen(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const songFromRoute = route?.params?.song;
  const song = props?.song ?? songFromRoute;

  // local derived values
  const name = song?.name ?? "Untitled";
  const lyrics =  song.blocks.filter(block => block.type === 'lyricsChords').flatMap(block => block.lyrics);
  const sheets = song?.sheets ?? [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
        <View style={styles.topBar}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            >
            <Ionicons name="chevron-back" size={40} color={colors.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
                {name}
            </Text>
        </View>
        <View style={styles.scroll}>
            <View style={styles.audioSection}>
                <AudioPlayer song={song} />
            </View>
            {/* Lyrics */}
            <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
            }}>
                <Text style={styles.sectionTitle}>Lyrics</Text>
                <TouchableOpacity onPress={() => 
                    navigation.navigate("LyricsFull", { song: song, edit: true})}>
                    <Feather name={"edit-2"} size={20} paddingRight={10}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fullScreen} onPress={() => {
                    navigation.navigate("LyricsFull", { song: song })}
                }>
                    <MaterialIcons name={"fullscreen"} size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.section}>
                {lyrics ? (
                  lyrics.map(line => (
                    <Text key={line.key} style={styles.lyricsText}>{line.text}</Text>
                  ))
                ) : (
                    <Text style={styles.placeholderText}>No lyrics available</Text>
                )}
            </ScrollView>

            {/* Sheets - horizontal scroll */}
            <Text style={styles.sectionTitle}>Sheets</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sheets.length === 0 ? (
                <View style={styles.noSheets}>
                    <Text style={styles.placeholderText}>No sheets available</Text>
                </View>
                ) : (
                sheets.map((sheet, idx) => (
                    <TouchableOpacity key={idx} style={styles.sheetCard}>
                    {sheet.imageUrl ? (
                        <Image source={{ uri: sheet.imageUrl }} style={styles.sheetImage} />
                    ) : (
                        <View style={styles.sheetPlaceholder} />
                    )}
                    <Text style={styles.sheetName} numberOfLines={1} ellipsizeMode="tail">
                        {sheet.name || `Sheet ${idx + 1}`}
                    </Text>
                    </TouchableOpacity>
                ))
                )}
            </ScrollView>
        </View>
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
    alignItems: "center",
    height: 56,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  audioSection: {
    marginBottom: 30,
    padding: 10,
    borderRadius: 15,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
  },
  section: {
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    minHeight: 100,
    maxHeight: 320,
  },
  sectionTitle: {
    fontSize: 22,
    paddingLeft: 10,
    fontWeight: "600",
    marginBottom: 8,
  },
  lyricsText: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 40,
    letterSpacing: 2,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.placeholderDark32,
  },
  noSheets: {
    paddingVertical: 12,
  },
  sheetCard: {
    width: 120,
    height: 140,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: colors.white90,
    alignItems: "center",
    padding: 8,
  },
  sheetImage: {
    width: 100,
    height: 90,
    borderRadius: 6,
    marginBottom: 8,
  },
  sheetPlaceholder: {
    width: 100,
    height: 90,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
    marginBottom: 8,
  },
  sheetName: {
    fontSize: 13,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  fullScreen: {
    position: 'absolute',
    top: 5,
    right: 40,
  },
});
