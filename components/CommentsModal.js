import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { users } from "../temp_data/Users";
import { getObjectById } from "../utils/DataHandle";
import colors from "../constants/colors";
import PersonSearchResault from "./PersonSearchResault";
import { posts } from "../temp_data/posts";

const CommentsModal = ({ headLine, postId, modalVisible, setModalVisible }) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
      };
    }, []),
  );

  const commentIds = getObjectById(postId, posts).commentIds;

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.greyArea}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <Text style={styles.moodalHeader}>{headLine}</Text>
          <ScrollView style={styles.commentsList}>
            {commentIds.map((commentId) => (
              <Comment
                key={commentId}
              />
            ))}
          </ScrollView>
          <AppTextInput
            placeholder="Write a comment..."
          />
        </View>
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
    maxHeight: "60%",
    minHeight: "40%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  moodalHeader: {
    alignSelf: "center",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  greyArea: {
    flex: 1,
  },
  commentsList: {
    marginBottom: 10,
  },
});

export default CommentsModal;
