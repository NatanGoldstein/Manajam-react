import React, { useState, useCallback } from 'react';
import myUser from '../screens/MainScreen'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useNavigation, useRoute, useFocusEffect} from '@react-navigation/native'; 
import { appBlue } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import MembersModal from '../components/MembersModal';
import Event from '../components/Event';
import Task from '../components/Task'
import { events } from '../temp_data/Events'
import { songs } from '../temp_data/Songs'
import { tasks } from '../temp_data/Tasks'
import { getObjectById } from '../utils/DataHandle';
import SongHeader from '../components/SongHeader';
import Collapsible from 'react-native-collapsible';
import { people } from '../temp_data/People';

function NavItem({ name, isActive, onPress }) {
    const size = 30
  
    return (
      <TouchableOpacity onPress={onPress} style={styles.navItem}>
        <Ionicons name={name} size={size} borderBottomWidth={isActive ? 4 : 0} />
      </TouchableOpacity>
    );
  }


export default function BandProfileScreen() {
  const route = useRoute();
  const { band } = route.params; // ✅ pull from navigation params
  const isMember = band.membersIds.includes(myUser.id)
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule');
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [newTaskMembers, setNewTaskMembers] = useState([])

  useFocusEffect(
      useCallback(() => {
      return () => {
          setModalVisible(false);
      };
      }, [])
  );

  function isInTaskMembers(memberId) {
    return (newTaskMembers.some(id => id === memberId))
  };

  const handleMemberSelection = (memberId) => {
    if (isInTaskMembers(memberId)) {
      setNewTaskMembers(prev => prev.filter(id => id !== memberId));
    }
    else {
      setNewTaskMembers(prev => [...prev, memberId]);
    }
  };

  function handleNewTask(){
    alert('New Task Added');
    // Placeholder — will connect to backend later
    setNewTaskMembers([])
    setCollapsed2(true)
    setCollapsed(!collapsed)
  };

  return (
     <SafeAreaView style={styles.super}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={40} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.name}>{band.name}</Text>
        </View>
        <View style={styles.topLine}>
          <Image source={{ uri: band.imageSource }} style={styles.profileImage} />
          <View style={styles.bio}>
            <Text style={styles.specs}>Main genre - {band.priGenre}</Text>
            <TouchableOpacity style={styles.members} onPress={() => setModalVisible(true)}>
                <Ionicons name={'person'} size={15} paddingRight={3}/>
                <Text style={{flex:1}}> {band.membersIds.length}</Text>
            </TouchableOpacity>
            <MembersModal 
              headLine={'Band Members'} ids={band.membersIds} 
              modalVisible={modalVisible} setModalVisible={setModalVisible}
            />
          </View>
        </View>
        <View style={styles.navBar}>
          <NavItem name="calendar-outline" isActive={activeTab === 'schedule'} onPress={() => setActiveTab('schedule')} />
          <NavItem name="musical-note-outline" isActive={activeTab === 'songs'} onPress={() => setActiveTab('songs')} />
          <NavItem name="checkbox-outline" isActive={activeTab === 'tasks'} onPress={() => setActiveTab('tasks')} />
        </View>

        {activeTab === 'schedule' && 
          <View>
            <TouchableOpacity style={styles.addButton} 
              onPress={() => navigation.navigate('NewEvent', { event:{bandId: band.id}, state: 'new' })}>
              <Text style={styles.addButtonText}>+ New Event</Text>
            </TouchableOpacity>
            <ScrollView style={styles.sectionContent}>
              {band.eventIds.map(eventId => {
                const event = getObjectById(eventId, events);
                return (
                  <Event event={event}/>
                )
              })}
            </ScrollView>
          </View>
        }

        {activeTab === 'songs' && 
          <View>
            <View style={styles.sectionTopLine}>
              <Text style={styles.sectionTitle}>Songs</Text>
              <TouchableOpacity>
                <Image source={require('../assets/add-icon.png')} style={styles.add}/>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.sectionContent}>
              {band.songIds.map(songId => {
                const song = getObjectById(songId, songs);
                return (
                  <SongHeader song={song}/>
                )
              })}
            </ScrollView>
          </View>
        }

        {activeTab === 'tasks' &&
          <View>
            <TouchableOpacity style={styles.addButton} 
              onPress={() => collapsed? setCollapsed(!collapsed): handleNewTask()}>
              <Text style={styles.addButtonText}>{collapsed? '+ New Task': 'Add Task'}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <View style={styles.newTask}>
                <TextInput style={styles.taskNameInput} placeholder='Task Name'/>
                <TextInput style={styles.taskDetailsInput} placeholder='Details...' multiline numberOfLines={2} />
                <View style={styles.ownersSection}>
                  <View flexDirection={'row'} justifyContent={'space-between'}>
                    <Text style={styles.ownersText}>Owners</Text>
                    <TouchableOpacity onPress={() => setCollapsed2(!collapsed2)}>
                      <Ionicons name={"add-circle"} size={30}/>
                    </TouchableOpacity>
                  </View>
                  <Collapsible collapsed={collapsed2}>
                    <ScrollView style={styles.drawer}>
                        {band.membersIds.map(memberId => {
                          const member = getObjectById(memberId, people);
                          const memberName = `${member.firstName} ${member.lastName}`
                          return (
                            <TouchableOpacity onPress={() => handleMemberSelection(memberId)}>
                              <Text style={styles.members}>
                                {isInTaskMembers(memberId) ? `☑   ${memberName}` : `⬚   ${memberName}`}
                              </Text>
                            </TouchableOpacity>
                          )
                        })}
                    </ScrollView>
                  </Collapsible>
                </View>
              </View>
            </Collapsible>
            <ScrollView style={styles.sectionContent}>
              {band.taskIds.map(taskId => {
                const task = getObjectById(taskId, tasks);
                return (
                  <Task task={task}/>
                )
              })}
            </ScrollView>
          </View>
        }

          
      </SafeAreaView>
      );
    };
     
     const styles = StyleSheet.create({
       super: {
         flex: 1
       },  
       container: {
         flex: 1,
         padding: 15
       },
       header: {
        flexDirection: 'row',
         alignItems: 'center',
         marginBottom: 20
       },
       topLine: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          marginBottom: 10,
          height: 100,
       },
       bio: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 20,
       },
       profileImage: {
         width: 100,
         height: 100,
         borderRadius: 20,
         marginBottom: 10,
       },
       name: {
         fontSize: 22,
         fontWeight: 'bold'
       },
       specs: {
         fontSize: 14,
         color: '#555',
       },
       actionContainer: {
         alignItems: 'center',
         marginBottom: 20
       },
       button: {
         marginTop: 20,
         backgroundColor: appBlue,
         paddingVertical: 10,
         paddingHorizontal: 20,
         borderRadius: 10
       },
       buttonText: {
         color: '#fff',
         fontWeight: 'bold'
       },
       backButton: {
        paddingRight: 20
       },
      navBar: {
        height: 40,
        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
        marginBottom: 10,
      },
      navItem: { 
        alignItems: 'center' 
      },
       addButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: 120,
        height: 45,
        marginBottom: 10,
        borderRadius: 20,
       },
       addButtonText: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 15,
       },
       sectionContent: {
        minHeight: 600,
       },
       sectionTitle: {
         fontSize: 20,
         fontWeight: 'bold',
         paddingLeft: 20,
         marginBottom: 5
       },
       listItem: {
         paddingVertical: 10,
         borderBottomWidth: 1,
         borderBottomColor: '#eee'
       },
       listText: {
         fontSize: 16
       },
       bandsSection: {
         height: 120,
       },
       bandImage: {
         height: 120,
         width: 120,
         paddingRight: 5,
         borderRadius: 10,
       },
       bandName: {
         position: 'absolute',
         width: 115,
         height: 25,
         borderTopLeftRadius: 10,
         borderTopRightRadius: 10,
         backgroundColor: 'rgba(255, 255, 255, 0.5)',
         zIndex: 999,
         textAlign: 'center'
       },
       members: {
        flex: 1,
        width: 40,
        flexDirection: 'row'
      },
      temp: {
        fontSize: 30,
      },
      add: {
        width: 25,
        height: 25,
        marginRight: 20
      },
      newTask: {
        width: '95%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: 'grey'
      },
      taskNameInput: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 15,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'justify',
        fontWeight: 'bold',
      },
      taskDetailsInput: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 15,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'justify',
        height: 80,
      },
      drawer: {
        width: 320
      },
      members: {
        alignSelf: 'flex-start',
        fontSize: 15,
        margin: 5,
      },
      ownersText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
      },
      ownersSection: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 15,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
      },
     });