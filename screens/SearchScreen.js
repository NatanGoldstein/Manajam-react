import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { instruments, genres, levels, facilities } from '../constants/lists';
import Filter from '../components/Filters';
import { searchResaults } from '../temp_data/SearchResaults';
import  PersonSearchResault  from '../components/PersonSearchResault'
import { people } from '../temp_data/People';
import { getObjectById } from '../utils/DataHandle'

export default function SearchScreen() {
    const [searchType, setSearchType] = useState('people');
    const [selectedInstrument, setSelectedInstrument] = useState(null);

    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');
    const personSearchResaults = searchResaults

    return (
    <Animated.View
        style={{
            zIndex: 30,
            backgroundColor: '#fff',
            top: 0,
            left: 0,
            width: width,
            height: height,
            borderRadius: 0,
            overflow: 'hidden',
            paddingHorizontal: 20,
            paddingTop: 60,
            }}
        >
        <View style={styles.searchBarOpen}>
            <TextInput style={styles.searchText} placeholder={'Search here...'} autoFocus={true}></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate( 'Main' )}>
          <Ionicons name="chevron-forward" size={30} style={styles.backButton} />
        </TouchableOpacity>
        </View>

        <View style={styles.filters}>
          <Filter
              tabs={
                searchType === 'rooms' 
                  ? ['Price', 'Facilities'] 
                  : ['Instrument', 'Genre', 'Level']
              }
              options={
                searchType === 'rooms' 
                  ? [['Low price', 'High price'], facilities] 
                  : [instruments, genres, levels]
              }
            />
        </View>


        <View style={styles.toggleButtons}>
            <TouchableOpacity
              style={[styles.toggleButton, searchType === 'people' && styles.activeToggle]}
              onPress={() => setSearchType('people')}
            >
              <Text style={styles.toggleText}>People</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, searchType === 'rooms' && styles.activeToggle]}
              onPress={() => setSearchType('rooms')}
            >
              <Text style={styles.toggleText}>Rooms</Text>
            </TouchableOpacity>
        </View>

        {searchType === 'rooms' ? (
          <ScrollView style={styles.results}>
            {searchResaults.map(personId => (
              <PersonSearchResault
                key={personId}
                person={getObjectById(personId, people)}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView style={styles.results}>
              {personSearchResaults.map(personId => 
              <PersonSearchResault 
              key={personId} 
              person={getObjectById(personId, people)}/>)}
            </ScrollView>
        )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
  searchBarOpen: {
    position: 'absolute', top: 80, left: 50, right: 20, height: 45,
    backgroundColor: '#eee', borderRadius: 20, paddingHorizontal: 15,
    flexDirection: 'row'
  },
  searchText: {
    flex: 1,
    fontSize: 16, zIndex: 30,
  },
  backButton: {
    color: "black", paddingTop: 8, paddingLeft: 10
  },
  toggleButtons: {
    flexDirection: 'row', marginBottom: 0, marginTop: 80 ,justifyContent: 'center',
  },
  toggleButton: {
    paddingVertical: 13, paddingHorizontal: 55, marginHorizontal: 5,
    borderRadius: 20, backgroundColor: '#eee',
  },
  activeToggle: { backgroundColor: '#000' },

  toggleText: { color: '#fff', fontWeight: '600' },

  filters: { 
    position: 'absolute',
    top: 75,
    left: 5
  },

  filterLabel: { fontWeight: '600', marginTop: 10 },

  filterInput: {
    backgroundColor: '#f2f2f2', borderRadius: 10,
    padding: 10, marginTop: 5,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instrumentList: {
    marginBottom: 16,
  },
  instrumentItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  instrumentItemSelected: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  results: {
    paddingTop: 20,
    flex: 1
  },
})