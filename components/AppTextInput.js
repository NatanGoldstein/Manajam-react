import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { getObjectById } from "../utils/DataHandle";
import { users } from "../temp_data/Users";
import LikeButton from "./LikeButton";
import { timeAgo } from "../utils/DateTimeHandle";
import comments from "../temp_data/Comments";
import { Ionicons } from "@expo/vector-icons";

const AppTextInput = ({ placeHolder, output }) => {
    const [comment, setComment] = useState("")

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.comment}
                placeholder={placeHolder}
                value={comment}
                onChangeText={text => setComment(text)}
            />
            <TouchableOpacity onPress={() => {output(comment), setComment('')}}>
                <Ionicons
                    name={"send"}
                    size={24}
                    color={ colors.black }
                    padding={8}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        marginBottom: 20,
    },
    comment:{
        fontSize: 14,
        paddingHorizontal: 10,
        width: 300,
    },
});

export default AppTextInput;