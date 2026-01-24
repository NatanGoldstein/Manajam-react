import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { getObjectById } from "../utils/DataHandle";
import { users } from "../temp_data/Users";
import LikeButton from "./LikeButton";
import { timeAgo } from "../utils/DateTimeHandle";
import CommentButton from "./CommentButton";

const Post = ({ data }) => {
  const user = getObjectById(data.userId, users);
  const postDate = timeAgo(data.createdAt);
  const navigation = useNavigation();
  
  return (
    <View style={styles.post}>
      <TouchableOpacity style={styles.userLine} onPress={() => navigation.navigate("Profile", { person: user })}>
        <Image
          source={{ uri: user.imageSource }}
          style={{ width: 35, height: 35, borderRadius: 20, marginRight: 10 }}
        />
        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      </TouchableOpacity>
      <Image source={{ uri: data.imageUrl }} style={{ width: '100%', height: 320, marginBottom: 10 }} />
      <View style={{ flexDirection: "row", justifyContent: "flex-start", marginBottom: 5 }}>
        <LikeButton postId={data.id} />
        <CommentButton postId={data.id} />
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{data.details}</Text>
      <Text style={styles.postDate}>{postDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
  backgroundColor: colors.white,
    borderTopWidth: 2,
  borderColor: colors.lightGray,
  },
  title: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 4,
  },
  userLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postDate: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    color: colors.darkGray,
  },
});

export default Post;
