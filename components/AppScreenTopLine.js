import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AppScreenTopLine = ({text}) => {
    const navigation = useNavigation()
    
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={40} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.name}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
    backButton: {
    paddingRight: 20,
  },
    name: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default AppScreenTopLine;