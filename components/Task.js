import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Image, Vibration } from 'react-native';
import { appBlue } from '../constants/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { people } from '../temp_data/People';
import { getObjectById } from '../utils/DataHandle'
import Collapsible from 'react-native-collapsible';
import { songs } from '../temp_data/Songs';
import MembersModal from './MembersModal';

const Task = ({ task }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const date = task.assignDate.toISOString().split("T")[0]
    const [done, setDone] = useState(task.done)

    return (
        <View style={styles.container}>  
            <Text style={styles.nameText}>{task.name}</Text>
            <TouchableOpacity style={styles.editButton} 
                onPress={() => navigation.navigate('NewEvent', { event: event, state: 'edit' })}>
                <Feather name={'edit-2'} size={20} />
            </TouchableOpacity>
            <View style={styles.details}>
                <TouchableOpacity  style={styles.checkButton} onPress={() => {setDone(!done); Vibration.vibrate(20) }}>
                    {done ? 
                        <Ionicons name={'checkbox'} size={35} color={'rgb(0, 102, 255)'}/> 
                        :
                        <Ionicons name={'square-outline'} size={35} />
                    }
                </TouchableOpacity>
                <View style={styles.leftSection}>
                    <Text style={styles.contentText}>{task.details}</Text>
                    <TouchableOpacity style={styles.attending} onPress={() => setModalVisible(true)}>
                        <Ionicons name={'person'} size={15} paddingRight={3}/>
                        <Text>{task.owners.length}  Owners</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.midSection}>
                    <Text style={styles.contentText}>{date}</Text>
                </View>
            </View>
            <MembersModal 
              headLine={'Task owners'} ids={task.owners} 
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
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 20,
    },
    contentText: {
        fontSize: 14,
        paddingBottom: 10,
    },
    midSection: {
        flexDirection: 'column',
        paddingLeft: 20,
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
    leftSection: {
        maxWidth: 200,
    },
    checkButton: {
        alignSelf: 'center'
    },
});

export default Task;