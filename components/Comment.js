import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { getObjectById } from "../utils/DataHandle";
import { users } from "../temp_data/Users";
import LikeButton from "./LikeButton";
import { timeAgo } from "../utils/DateTimeHandle";
import comments from "../temp_data/Comments";

const Comment = ({ commentData }) => {
    const user = getObjectById(commentData.userId, users)
    const commentDateTime = timeAgo(commentData.createdAt)
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style={styles.topLine}>
                <View style={styles.userLine}>
                    <Image source={{ uri: user.imageSource }} style={styles.userImage} />
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("Profile", {
                            person: user,
                            isCurrentUser: false,
                        })}
                    >
                        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.dateTime}>{commentDateTime}</Text>
            </View>
            <Text style={styles.comment}>{commentData.content}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        height: 100,
    },
    topLine:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userLine:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userImage:{
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    userName:{
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
    },
    dateTime:{
        fontSize: 10,
        paddingLeft: 20,
    },
    comment:{
        fontSize: 14,
    },
});

export default Comment;