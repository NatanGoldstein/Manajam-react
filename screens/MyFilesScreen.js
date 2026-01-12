import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { lyricsFiles } from "../temp_data/LyricsFiles";
import { useNavigation } from "@react-navigation/native";
import CreateNewFileModal from "../components/CreateNewFileModal";

export default function MyFilesScreen() {
  const navigation = useNavigation();

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const sheetFiles = [];

  const handleCreateLyrics = () => {
    setCreateModalVisible(true);
  };

  const handleCreateSheet = () => {
    alert("Create Sheet - to be implemented");
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
      <CreateNewFileModal
        modalVisible={createModalVisible}
        setModalVisible={setCreateModalVisible}
      />
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
