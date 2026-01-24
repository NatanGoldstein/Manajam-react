import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { bands } from "../temp_data/Bands";
import { getObjectById } from "../utils/DataHandle";
import { getUserId } from "../local_data/UserData";
import { users } from "../temp_data/Users";
import AppScreenTopLine from "../components/AppScreenTopLine";
import AppButton from "../components/AppButton";

export default function ProfileScreen() {
  const route = useRoute();
  let person;
  let isCurrentUser;
  if (route.name == "Main") {
    person = getObjectById(getUserId(), users);
    isCurrentUser = true;
  } else {
    ({ person, isCurrentUser } = route.params); // ✅ pull from navigation params
  }
  const navigation = useNavigation();

  const userName = `${person.firstName} ${person.lastName}`

  function handlePress(){
    // later
  };

  return (
    <SafeAreaView style={styles.super}>
      {isCurrentUser ? (
        <View style={styles.header}>
          <Text style={styles.name}>{userName}</Text>
        </View>
      ) : (
        <AppScreenTopLine text={userName} />
      )}
      <View style={styles.topSection}>
        <Image
          source={{ uri: person.imageSource }}
          style={styles.profileImage}
        />
        <View style={styles.bio}>
          <Text style={styles.specs}>
            Instruments - {person.primaryInstrument}
            {person.secondaryInstrument ? `, ${person.secondaryInstrument}` : ""}
          </Text>
          <Text style={styles.specs}>
            Favorite genre - {person.genre} {"\n"}Level - {person.level}
          </Text>
        </View>
      </View>
      <AppButton
        text={isCurrentUser? "Edit Profile" : "Message"}
        onPress={handlePress}
        apllied={isCurrentUser}
      />
      <ScrollView style={styles.container}>
        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "600" }}>
          Bands
        </Text>
        {person.bands && person.bands.length > 0 ? (
          <ScrollView style={styles.bandsSection} horizontal={true}>
            {person.bands.map((bandId) => {
              const band = getObjectById(bandId, bands);
              return (
                <TouchableOpacity
                  key={bandId}
                  onPress={() =>
                    navigation.navigate("BandProfile", { band: band })
                  }
                >
                  <Text style={styles.bandName}>{band.name}</Text>
                  <Image
                    source={{ uri: band.imageSource }}
                    style={styles.bandImage}
                  />
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
}

const styles = StyleSheet.create({
  super: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginBottom: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 15,
  },
  bio: {
    alignItems: 'flex-start'
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  specs: {
    fontSize: 14,
    color: colors.darkGray,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.appBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: -200,
    left: -150,
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
    position: "absolute",
    width: 115,
    height: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  backgroundColor: colors.white68,
    zIndex: 999,
    textAlign: "center",
  },
});
