import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Image } from 'react-native';
import { appBlue } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { getObjectById } from '../utils/DataHandle';
import { people } from '../temp_data/People';

const ChatHeader = ({ chat }) => {
    const navigation = useNavigation();
    const user = getObjectById(chat.userId, people);
    const unReadCount = chat.unRead;

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{uri: user.imageSource}}/>
            <View style={styles.textArea}>
                <View style={styles.topLine}>
                    <Text style={styles.nameText}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={styles.text}>
                        {chat.lastMessageTime}
                    </Text>
                </View>
                <Text style={{flex:1}}>
                    {chat.lastMessage}
                </Text>
            </View>
            {unReadCount > 0 ? (
                <Text style={styles.unReadCount}>
                    {unReadCount}
                </Text>
            ):(
                <View></View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        justifyContent: 'flex-start',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    textArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    topLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12
    },
    image: {
        height: '100%',
        width: 90,
        paddingRight: 20,
        borderRadius: 40
    },
    unReadCount: {
        color: 'white',
        zIndex: 999,
        position: 'absolute',
        right: 30,
        top: 50,
        backgroundColor: appBlue,
        width: 25,
        height: 25,
        borderRadius: 15,
        textAlign: 'center',
        padding: 4
    },
});

export default ChatHeader;