import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const AppButton = ({text, onPress, apllied}) => {
 return (
    <TouchableOpacity
            style={[ 
              styles.button, 
              apllied ? { backgroundColor: colors.appBlue } : null 
            ]}
            onPress={ () => onPress() }
          >
            <Text style={styles.ButtonText}>{text}</Text>
          </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        width: 120,
        height: 45,
        borderRadius: 20,
        margin: 10,
    },
    ButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default AppButton;