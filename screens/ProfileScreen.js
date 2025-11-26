import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { appBlue } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { bands } from '../temp_data/Bands'
import { getObjectById } from '../utils/DataHandle';
import { getUserId } from '../local_data/UserData';
import { people } from '../temp_data/People';

export default function ProfileScreen() {
  const route = useRoute();
  let person;
  let isCurrentUser;
  if (route.name == 'Main') {
    person = getObjectById(getUserId(), people);
    isCurrentUser = true;
  }
  else {
   ({ person, isCurrentUser } = route.params); // ✅ pull from navigation params 
  }
  const navigation = useNavigation();

  return (
 <SafeAreaView style={styles.super}>
      <View style={styles.header}>
        <Image source={{ uri: person.imageSource }} style={styles.profileImage} />
        <Text style={styles.name}>{person.firstName} {person.lastName}</Text>
        <Text style={styles.specs}>
          Instruments - {person.primaryInstrument}
          {person.secondaryInstrument ? `, ${person.secondaryInstrument}` : ''}
        </Text>
        <Text style={styles.specs}>
            Favorite genre - {person.genre} {'\n'}Level - {person.level}
        </Text>
        {/* Action Button */}
        {isCurrentUser ? (
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={40} style={styles.backButton} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={styles.container}>
      {/* Top Section - Profile Image & Specs */}

      {/* Bands Section */}
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "600" }}>
          Bands
      </Text>
      {person.bands && person.bands.length > 0 ? (
        <ScrollView style={styles.bandsSection} horizontal={true}>
          {person.bands.map(bandId => {
            const band = getObjectById(bandId, bands);
            return (
              <TouchableOpacity key={bandId} 
               onPress={() => navigation.navigate('BandProfile', { band: band})}>
                <Text style={styles.bandName}>{band.name}</Text>
                <Image source={{ uri: band.imageSource }} style={styles.bandImage} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
          <Text style={{ fontStyle: "italic", padding: 8 }}>No bands yet</Text>
      )}

      {/* Events Section */}
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "600" }}>
          Events History
      </Text>
      {person.events && person.events.length > 0 ? (
          <FlatList
          data={person.events}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <Text style={{ padding: 8 }}>
              {item.name} ({item.date})
              </Text>
          )}
          />
      ) : (
          <Text style={{ fontStyle: "italic", padding: 8 }}>No events yet</Text>
      )}
      </ScrollView>
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
    alignItems: 'center',
    marginBottom: 20
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  specs: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center'
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
    position: 'absolute',
    top: -200, left: -150

  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
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
    textAlign: 'center',
  },
});