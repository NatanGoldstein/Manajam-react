import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const CreateNewFileModal = ({ modalVisible, setModalVisible }) => {
    const navigation = useNavigation();
    const [newFileName, setNewFileName] = React.useState("");
    const handleConfirmCreateLyrics = () => {
        const inputName = newFileName && newFileName.trim().length > 0 ? newFileName.trim() : "Untitled";
        setModalVisible(false);
        navigation.navigate("LyricsFull", { song: { name: inputName, blocks: [] }, edit: true });
    };

  return (
    <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create New Lyrics File</Text>
            <TextInput
                style={styles.modalInput}
                placeholder="File name"
                value={newFileName}
                onChangeText={setNewFileName}
                autoFocus
            />
            <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setCreateModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.modalPrimary]} onPress={handleConfirmCreateLyrics}>
                <Text style={[styles.modalButtonText, styles.modalPrimaryText]}>Create</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
 modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      width: '85%',
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 12,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
        marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 12,
    },
    modalPrimary: {
      backgroundColor: colors.appBlue,
    },
    modalButtonText: {
      color: colors.black,
      fontWeight: '600',
    },
    modalPrimaryText: {
      color: colors.white,
    },
});

export default CreateNewFileModal;
