import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getUserId } from "../local_data/UserData";
import { getObjectById } from "../utils/DataHandle";
import { posts } from "../temp_data/posts";
import colors from "../constants/colors";
import MembersModal from "./MembersModal";
import CommentsModal from "./CommentsModal";

const  CommentButton = ({ postId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [commentIds, setCommentIds] = useState([])
  const post = getObjectById(postId, posts);

  useFocusEffect(
      useCallback(() => {
        const post = getObjectById(postId, posts);
        const initialComments = post?.commentIds ?? [];
        setCommentIds(initialComments);
      }, [postId])
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name={ "chatbubble" }
          size={24}
          color={ colors.black }
        />
      </TouchableOpacity>
      <Text style={styles.likeCountText}>{commentIds.length}</Text>

      <CommentsModal
        headLine={`Comments (${commentIds.length})`}
        postId={postId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  button: {
    marginRight: 2,
  },
  buttonLiked: {
    // Visual feedback when liked
  },
  likeCount: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  likeCountText: {
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: "500",
  },
});

export default CommentButton;
