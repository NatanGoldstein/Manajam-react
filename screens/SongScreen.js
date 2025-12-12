import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
  const lyrics = song?.lyrics ?? "";
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
        <View style={styles.audioSection}>
            <AudioPlayer song={song} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
            {/* Lyrics */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lyrics</Text>
            {lyrics ? (
                <Text style={styles.lyricsText}>{lyrics}</Text>
            ) : (
                <Text style={styles.placeholderText}>No lyrics available</Text>
            )}
            </View>

        {/* Sheets - horizontal scroll */}
        <View style={styles.section}>
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
    marginBottom: 25,
    padding: 10,
    borderRadius: 15,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.overlayGray55,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  lyricsText: {
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 22,
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
});
