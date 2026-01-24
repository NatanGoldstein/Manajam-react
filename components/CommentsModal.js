import React, { useCallback } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getObjectById } from "../utils/DataHandle";
import colors from "../constants/colors";
import { posts } from "../temp_data/posts";
import Comment from "./Comment";
import AppTextInput from "./AppTextInput";
import comments from "../temp_data/Comments";
import { getUserId } from "../local_data/UserData";

const CommentsModal = ({ headLine, postId, modalVisible, setModalVisible }) => {
  const currentUserId = getUserId()

  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
      };
    }, []),
  );

  const commentIds = getObjectById(postId, posts).commentIds;

  function handleComment(comment){
    const commentDateTime = new Date()
    // BackEnd.submitComment(currentUserId, commentDateTime, postId, comment)
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.greyArea}
          onPress={() => setModalVisible(false)}
        />
        <KeyboardAvoidingView 
          style={styles.modalContent} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <Text style={styles.moodalHeader}>{headLine}</Text>
          <ScrollView style={styles.commentsList}>
            {commentIds.map((commentId) => (
              <Comment
                key={commentId}
                commentData={getObjectById(commentId, comments)}
              />
            ))}
          </ScrollView>
          <AppTextInput placeHolder={"Write new comment..."} output={handleComment} />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.blackTransparent,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 25,
    maxHeight: "80%",
    minHeight: "40%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  moodalHeader: {
    alignSelf: "center",
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  greyArea: {
    flex: 1,
  },
  commentsList: {
    marginBottom: 10,
  },
});

export default CommentsModal;
