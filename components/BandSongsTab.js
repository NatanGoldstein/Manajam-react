import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import SongHeader from "./SongHeader";
import { songs } from "../temp_data/Songs";
import { getObjectById } from "../utils/DataHandle";
import { useNavigation } from "@react-navigation/native";
import AppButton from "./AppButton";

export default function BandSongsTab({ band }) {
  const navigation = useNavigation()

  function createNewSong(){
    navigation.navigate("NewSong", {
      song: { bandId: band.id },
      state: "new",
    })
  }
  
  return (
    <View>
      <AppButton
        text={"+ New Song"}
        onPress={createNewSong}
        apllied={false}
      />
      <ScrollView style={styles.sectionContent}>
        {band.songIds.map((songId) => {
          const song = getObjectById(songId, songs);
          if (!song) {
            return null;
          }
          return <SongHeader key={songId} song={song} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: 120,
    height: 45,
    marginBottom: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  sectionContent: {
    minHeight: 600,
  },
});
