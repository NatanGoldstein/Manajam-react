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

const LikeButton = ({ postId }) => {
  const [likeIds, setLikeIds] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentUserId = getUserId();

  // Initialize likes from post data
  useFocusEffect(
    useCallback(() => {
      const post = getObjectById(postId, posts);
      const initialLikes = post?.likeIds ?? [];
      setLikeIds(initialLikes);
      setIsLiked(initialLikes.includes(currentUserId));
    }, [postId])
  );

  function handleLikePress() {
    // add backend call later
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLiked && styles.buttonLiked]}
        onPress={handleLikePress}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={24}
          color={isLiked ? colors.black : colors.darkGray}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.likeCount}
        onPress={() => likeIds.length > 0 && setModalVisible(true)}
      >
        <Text style={styles.likeCountText}>{likeIds.length}</Text>
      </TouchableOpacity>

      <MembersModal
        headLine={`Liked by (${likeIds.length})`}
        ids={likeIds}
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
    marginBottom: 10,
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

export default LikeButton;
