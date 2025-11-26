import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { appBlue } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { bands } from '../temp_data/Bands'
import { getObjectById } from '../utils/DataHandle';

const BandProfileGenerator = ({ band, isMember }) => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.super}>
      <View style={styles.header}>
        <Image source={{ uri: band.imageSource }} style={styles.profileImage} />
        <Text style={styles.name}>{band.name}</Text>
        <Text style={styles.specs}>
            Main genre - {band.priGenre} {'\n'}Level - {band.level}
        </Text>
        {/* Action Button */}
        {isMember ? (
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
    textAlign: 'center'
  },
});

export default BandProfileGenerator;
