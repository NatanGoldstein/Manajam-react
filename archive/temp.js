import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const instruments = ['Guitar', 'Bass', 'Drums', 'Piano', 'Saxophone', 'Violin'];

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('map');
  const [showSearchScreen, setShowSearchScreen] = useState(false);
  const [searchType, setSearchType] = useState('people');
  const searchBarTop = 80;
  const searchBarLeft = 20;
  const searchBarWidth = width - 40;
  const searchBarHeight = 45;
  const animationSpeed = 150;

  const [selectedInstrument, setSelectedInstrument] = useState(null);

  const [animation] = useState({
    top: new Animated.Value(searchBarTop),
    left: new Animated.Value(searchBarLeft),
    width: new Animated.Value(searchBarWidth),
    height: new Animated.Value(searchBarHeight),
    borderRadius: new Animated.Value(20),
  });



  const openSearch = () => {
    setShowSearchScreen(true);

    Animated.parallel([
      Animated.timing(animation.top, {
        toValue: 0,
        duration: animationSpeed,
        useNativeDriver: false,
      }),
      Animated.timing(animation.left, {
        toValue: 0,
        duration: animationSpeed,
        useNativeDriver: false,
      }),
      Animated.timing(animation.width, {
        toValue: width,
        duration: animationSpeed,
        useNativeDriver: false,
      }),
      Animated.timing(animation.height, {
        toValue: height,
        duration: animationSpeed,
        useNativeDriver: false,
      }),
      Animated.timing(animation.borderRadius, {
        toValue: 0,
        duration: animationSpeed,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeSearch = () => {
    Animated.parallel([
        Animated.timing(animation.top, {
          toValue: searchBarTop,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.left, {
          toValue: searchBarLeft,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.width, {
          toValue: searchBarWidth,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.height, {
          toValue: searchBarHeight,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
        Animated.timing(animation.borderRadius, {
          toValue: 20,
          duration: animationSpeed,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowSearchScreen(false);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 32.0853,
          longitude: 34.7818,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      <Image
        source={require('../assets/appicon.png')}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.searchBarClose} onPress={openSearch}>
        <Text style={styles.searchPlaceholder}>Search here...</Text>
      </TouchableOpacity>

      {showSearchScreen && (
        <Animated.View
        style={{
            position: 'absolute',
            zIndex: 30,
            backgroundColor: '#fff',
            top: animation.top,
            left: animation.left,
            width: animation.width,
            height: animation.height,
            borderRadius: animation.borderRadius,
            overflow: 'hidden',
            paddingHorizontal: 20,
            paddingTop: 60,
        }}
        >
          <View style={styles.searchHeader}>
            <TouchableOpacity onPress={closeSearch}>
                <Ionicons name="chevron-forward" size={30} style={styles.backButton} />
            </TouchableOpacity>
          </View>

          <TextInput style={styles.searchBarOpen} placeholder={'Search here...'} autoFocus={true}></TextInput>

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
            <View style={styles.filters}>
              <Text style={styles.filterLabel}>Location</Text>
              <TextInput style={styles.filterInput} placeholder="Enter location" />
              <Text style={styles.filterLabel}>Price</Text>
              <TextInput style={styles.filterInput} placeholder="Enter max price" keyboardType="numeric" />
              <Text style={styles.filterLabel}>Available Dates</Text>
              <TextInput style={styles.filterInput} placeholder="Choose dates" />
            </View>
          ) : (
            <View style={styles.filters}>
               {/* Instrument Filter */}
                <Text style={styles.filterLabel}>Instrument</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.instrumentList}>
                    {instruments.map((instrument) => (
                    <TouchableOpacity
                        key={instrument}
                        style={[
                        styles.instrumentItem,
                        selectedInstrument === instrument && styles.instrumentItemSelected,
                        ]}
                        onPress={() => setSelectedInstrument(instrument)}
                    >
                        <Text
                        style={{
                            color: selectedInstrument === instrument ? 'white' : 'black',
                        }}
                        >
                        {instrument}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
          )}
        </Animated.View>
      )}

      <View style={styles.navBar}>
        <NavItem name="map-marker" isActive={activeTab === 'map'} onPress={() => setActiveTab('map')} />
        <NavItem name="musical-notes" isActive={activeTab === 'bands'} onPress={() => setActiveTab('bands')} />
        <NavItem name="checkbox-outline" isActive={activeTab === 'tasks'} onPress={() => setActiveTab('tasks')} />
        <NavItem name="person" isActive={activeTab === 'profile'} onPress={() => setActiveTab('profile')} />
      </View>
    </View>
  );
}

function NavItem({ name, isActive, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.navItem}>
      {name === 'map-marker' ? (
        <MaterialCommunityIcons name={name} size={40} color={isActive ? 'rgb(2, 150, 255)' : '#000'} />
      ) : (
        <Ionicons name={name} size={30} color={isActive ? 'rgb(2, 150, 255)' : '#000'} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: 'rgb(190, 210, 209)',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
  },
  navItem: { alignItems: 'center' },
  logo: {
    position: 'absolute', top: 79, right: 15, width: 48, height: 48, zIndex: 25,
    shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 },
  },
  searchBarClose: {
    position: 'absolute', top: 80, left: 20, right: 20, height: 45,
    backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15,
    fontSize: 16, zIndex: 20, elevation: 5,
    shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 },
  },
  searchBarOpen: {
    position: 'absolute', top: 80, left: 20, right: 20, height: 45,
    backgroundColor: '#eee', borderRadius: 20, paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 16, zIndex: 20, elevation: 5,
  },
  searchPlaceholder: {
    fontSize: 16, color: '#888', marginTop: 12,
  },
  searchScreen: {
    position: 'absolute', top: 0, left: 0, right: 0,
    backgroundColor: '#fff', zIndex: 30, overflow: 'hidden',
    paddingHorizontal: 20, paddingTop: 60,
  },
  searchHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 20, zIndex: 999,
  },
  backButton: {
    color: "black", position: 'absolute', right: 5, top: 27, zIndex: 999,
  },
  searchTitle: {
    fontSize: 22, fontWeight: 'bold', flex: 1, textAlign: 'center', marginRight: 28,
  },
  toggleButtons: {
    flexDirection: 'row', marginBottom: 20, marginTop: 60 ,justifyContent: 'center',
  },
  toggleButton: {
    paddingVertical: 13, paddingHorizontal: 55, marginHorizontal: 5,
    borderRadius: 20, backgroundColor: '#eee',
  },
  activeToggle: { backgroundColor: '#000' },

  toggleText: { color: '#fff', fontWeight: '600' },

  filters: { marginTop: 10 },

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
});
