import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { appBlue } from "../constants/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MembersModal from "./MembersModal";

const BandHeader = ({ band }) => {
  const navigation = useNavigation();
  const unReadCount = band.unRead;
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
      };
    }, []),
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("BandProfile", { band: band })}
    >
      <Image style={styles.image} source={{ uri: band.imageSource }} />
      <View style={styles.textArea}>
        <Text style={styles.nameText}>{band.name}</Text>
        <Text style={styles.text}>{band.priGenre}</Text>
        <TouchableOpacity
          style={styles.members}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name={"person"} size={15} paddingRight={3} />
          <Text style={{ flex: 1 }}> {band.membersIds.length}</Text>
        </TouchableOpacity>
      </View>
      {unReadCount > 0 ? (
        <Text style={styles.unReadCount}>{unReadCount}</Text>
      ) : (
        <View></View>
      )}
      <MembersModal
        headLine={"Band Members"}
        ids={band.membersIds}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></MembersModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    justifyContent: "flex-start",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  nameText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    paddingBottom: 15,
  },
  image: {
    height: "100%",
    width: 90,
    paddingRight: 20,
    borderRadius: 15,
  },
  unReadCount: {
    color: "white",
    zIndex: 999,
    position: "absolute",
    right: 30,
    top: 50,
    backgroundColor: appBlue,
    width: 25,
    height: 25,
    borderRadius: 15,
    textAlign: "center",
    padding: 4,
  },
  members: {
    flex: 1,
    width: 40,
    flexDirection: "row",
  },
});

export default BandHeader;
