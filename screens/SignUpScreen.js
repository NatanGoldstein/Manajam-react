import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { instruments, genres, levels } from '../constants/lists';


export default function SignUpScreen({ navigation }) {
  // First block
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  // Second block
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  // Third block
  const [primaryInstrument, setPrimaryInstrument] = useState('vocals');
  const [secondaryInstrument, setSecondaryInstrument] = useState('');
  const [genre, setGenre] = useState('rock');
  const [level, setLevel] = useState('beginner');

  function handleSubmit() {
    alert('Submitting...');
    // Placeholder — will connect to backend later
  }

  return (
    <ImageBackground
      source={require('../assets/sign_up_back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.block}>
          <Image 
            source={require('../assets/personal_info.png')}
            style={styles.icon}
          ></Image>
          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />
          <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
          <TextInput style={styles.input} placeholder="Street" value={street} onChangeText={setStreet} />
          <TextInput style={styles.input} placeholder="House #" value={house} onChangeText={setHouse} marginBottom='2'/>
        </View>

        <View style={styles.block}>
          <Image 
            source={require('../assets/account.png')}
            style={styles.icon}
            height={80}
            padding={10}
            marginBottom={10}
          ></Image>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Verify Password" value={verifyPassword} onChangeText={setVerifyPassword} secureTextEntry />
        </View>

        <View style={styles.block} marginBottom={50}>
          <Image 
            source={require('../assets/music.png')}
            style={styles.icon}
            height={80}
            padding={10}
          ></Image>
          <Text style={styles.label}>Primary Instrument</Text>
          <Picker selectedValue={primaryInstrument} onValueChange={setPrimaryInstrument} style={styles.picker}>
            {instruments.map((instrument) => (
              <Picker.Item
                label={instrument}
                value={instrument}
              />
            ))}
          </Picker>

          <Text style={styles.label}>Secondary Instrument (optional)</Text>
          <Picker selectedValue={secondaryInstrument} onValueChange={setSecondaryInstrument} style={styles.picker}>
            {instruments.map((instrument) => (
              <Picker.Item
                label={instrument}
                value={instrument}
              />
            ))}
          </Picker>
          <Text style={styles.label}>Favorite Genre</Text>
          <Picker selectedValue={genre} onValueChange={setGenre} style={styles.picker}>
            {genres.map((genre) => (
              <Picker.Item
                label={genre}
                value={genre}
              />
            ))}
          </Picker>

          <Text style={styles.label}>Level</Text>
          <Picker selectedValue={level} onValueChange={setLevel} style={styles.picker}>
            {levels.map((level) => (
                <Picker.Item
                  label={level}
                  value={level}
                />
              ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    padding: 15,
    paddingBottom: 60,
    paddingTop: 140,
    paddingBottom: 60,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    zIndex: 10,
  },
  headerTitle: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backText: {
    fontSize: 16,
    color: '#000',
    paddingRight: 20,
  },
  backButton: {
    padding: 10,
    zIndex: 100,
  },
  block: {
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  icon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 90,
    height: 90,
  },
  listView: {
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    height: '120',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(13, 3, 3, 0.9)',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
