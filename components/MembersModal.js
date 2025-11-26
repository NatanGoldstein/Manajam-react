import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { people } from '../temp_data/People';
import { getObjectById } from '../utils/DataHandle'
import PersonSearchResault from './PersonSearchResault';

const MembersModal = ({ headLine, ids, modalVisible, setModalVisible }) => {

    useFocusEffect(
        useCallback(() => {
        return () => {
            setModalVisible(false);
        };
        }, [])
    );

    return (      
        <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <TouchableOpacity style={styles.greyArea}
                onPress={() => setModalVisible(false)}/>
                <View style={styles.modalContent}>
                    <Text style={styles.moodalHeader}>{headLine}</Text>
                    <ScrollView>
                        {ids.map(personId => (
                        <PersonSearchResault
                            key={personId}
                            person={getObjectById(personId, people)}
                        />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
     modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 25,
        maxHeight: '60%',
        minHeight: '40%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    moodalHeader: {
        alignSelf: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    greyArea: {
        flex: 1,

    },
});

export default MembersModal;