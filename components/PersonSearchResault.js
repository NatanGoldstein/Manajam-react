import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserId } from "../local_data/UserData";
import colors from "../constants/colors";

const PersonSearchResault = ({ person }) => {
  const navigation = useNavigation();
  const isCurrentUser = person.id === getUserId();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Profile", {
          person: person,
          isCurrentUser: isCurrentUser,
        })
      }
    >
      <Image style={styles.image} source={{ uri: person.imageSource }} />
      <View>
        <Text style={styles.nameText}>
          {person.firstName} {person.lastName}
        </Text>
        <Text style={styles.bioText}>
          {person.primaryInstrument} | {person.secondaryInstrument} |{" "}
          {person.level} | {person.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  borderBottomColor: colors.lightGray,
  },
  nameText: {
    fontWeight: "bold",
  },
  bioText: {
    fontSize: 12,
  color: colors.darkGray,
  },
  image: {
    height: "100%",
    width: 90,
    paddingRight: 20,
    borderRadius: 40,
  },
});

export default PersonSearchResault;
