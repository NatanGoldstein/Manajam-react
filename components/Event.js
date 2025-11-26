import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Image } from 'react-native';
import { appBlue } from '../constants/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { people } from '../temp_data/People';
import { getObjectById } from '../utils/DataHandle'
import Collapsible from 'react-native-collapsible';
import { songs } from '../temp_data/Songs';
import MembersModal from './MembersModal';

const Event = ({ event }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [attending, setAttending] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const date = event.date.toISOString().split("T")[0]

    return (
        <View style={styles.container}>  
            <Text style={styles.nameText}>{event.topic}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={() => navigation.navigate('NewEvent', { event: event, state: 'edit' })}>
                <Feather name={'edit-2'} size={20} />
            </TouchableOpacity>
            <View style={styles.details}>
                <TouchableOpacity style={styles.calanderButton}>
                    <Image source={require('../assets/calander-icon.png')} style={styles.calander}/>
                </TouchableOpacity>
                <View style={styles.leftSection}>
                    <Text style={styles.contentText}>{date}</Text>
                    <Text style={styles.contentText}>{event.startTime}-{event.endTime}</Text>
                </View>
                <View style={styles.midSection}>
                    <Text style={styles.contentText}>
                        <MaterialCommunityIcons size={15} name={'map-marker'}/>
                        {event.location}
                    </Text>
                    <TouchableOpacity style={styles.attending} onPress={() => setModalVisible(true)}>
                        <Ionicons name={'person'} size={15} paddingRight={3}/>
                        <Text style={styles.contentText}>{event.attendingMembers.length}  Attending</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.attendingCont}>
                    <TouchableOpacity 
                        style={[styles.attendingButtonV, 
                            {backgroundColor: attending===1 ? 'rgb(62, 251, 56)' : 'rgba(151, 196, 149, 0.39)'}]}
                        onPress={() => setAttending(1)}
                    >
                        <Text>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.attendingButtonX, 
                            {backgroundColor: attending===2 ? 'rgb(255, 132, 132)' : 'rgba(196, 149, 149, 0.39)'}]}
                        onPress={() => setAttending(2)}>
                        
                        <Text>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.attendingButtonM, 
                            {backgroundColor: attending===3 ? 'rgb(255, 119, 250)' : 'rgba(188, 149, 196, 0.39)'}]}
                        onPress={() => setAttending(3)}>
                        <Text>?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.songsButton} onPress={() => setCollapsed(!collapsed)}>
                <Text style={styles.contentText}>{collapsed ? '▼ Songs' : '▲ Songs'}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                <ScrollView style={styles.drawer}>
                    {event.songsList.map(songId => {
                        const song = getObjectById(songId, songs)
                        if (!song) {
                            return null;
                        }
                        return (
                            <Text key={songId} style={styles.song}>{song.name}</Text>
                        )
                    })}
                </ScrollView>
            </Collapsible>
            <MembersModal 
              headLine={'Attending Members'} ids={event.attendingMembers} 
              modalVisible={modalVisible} setModalVisible={setModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        minHeight: 120,
        maxHeight: 380,
        width: '97%',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginLeft: '1.75%',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    details: {
        flexDirection: 'row',
        verticalAlign: 'center',
        justifyContent: 'space-between',
        paddingLeft: 50,
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 20,
    },
    contentText: {
        fontSize: 14,
        paddingBottom: 2,
    },
    midSection: {
        flexDirection: 'column',
    },
    drawer: {
        maxHeight: 150,
        marginTop: 5,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(1, 1, 1, 0.08)',
    },
    song: {
        paddingLeft: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    attendingCont: {
        flexDirection: 'row',
        height: 35,
        width: 80,
        borderColor: 'grey',
        borderRadius: 15,
        borderWidth: 1,
    },
    attendingButtonV: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'grey',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    attendingButtonX: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'grey',
    },
    attendingButtonM: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: 'grey',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    calanderButton: {
        position: 'absolute',
        left: -10,
        top: -13,
    },
    calander: {
        width: 60,
        height: 60,
        shadowColor: 'black',
        shadowOffset: 10
    },
    attending:{
        flexDirection: 'row',
    },
    songsButton: {
        paddingTop: 10,
        alignSelf: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 15,
        right: 5,
    },
});

export default Event;