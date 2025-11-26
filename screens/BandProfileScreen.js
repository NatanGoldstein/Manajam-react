import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MembersModal from '../components/MembersModal';
import BandScheduleTab from '../components/BandScheduleTab';
import BandSongsTab from '../components/BandSongsTab';
import BandTasksTab from '../components/BandTasksTab';

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
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule');

  useFocusEffect(
      useCallback(() => {
      return () => {
          setModalVisible(false);
      };
      }, [])
  );


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

        {activeTab === 'schedule' && (
          <BandScheduleTab band={band} navigation={navigation} />
        )}

        {activeTab === 'songs' && <BandSongsTab band={band} />}

        {activeTab === 'tasks' && <BandTasksTab band={band} />}

          
      </SafeAreaView>
      );
    };
     
     const styles = StyleSheet.create({
       super: {
         flex: 1,
       },
       header: {
         flexDirection: 'row',
         alignItems: 'center',
         marginBottom: 20,
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
         fontWeight: 'bold',
       },
       specs: {
         fontSize: 14,
         color: '#555',
       },
       members: {
         flexDirection: 'row',
         alignItems: 'center',
         paddingVertical: 5,
         paddingHorizontal: 10,
       },
       backButton: {
         paddingRight: 20,
       },
       navBar: {
         height: 40,
         flexDirection: 'row',
         justifyContent: 'space-around',
         alignItems: 'center',
         marginBottom: 10,
       },
       navItem: {
         alignItems: 'center',
       },
     });