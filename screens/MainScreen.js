import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapScreen from "./MapScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TasksScreen from "./TasksScreen";
import BandssScreen from "./BandsScreen";
import ProfileScreen from "./ProfileScreen";
import MyFilesScreen from "./MyFilesScreen";
import colors from "../constants/colors";

function NavItem({ name, isActive, onPress }) {
  const IconComponent =
    name === "map-marker" ? MaterialCommunityIcons : 
    name === "audio-file" ? MaterialIcons : Ionicons;
  const size = name === "map-marker" ? 40 : 30;

  return (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
      <IconComponent
        name={name}
        size={size}
        color={isActive ? colors.linkBlue : colors.black}
      />
    </TouchableOpacity>
  );
}

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === "map" && <MapScreen />}
        {activeTab === "myProfile" && <ProfileScreen />}
        {activeTab === "tasks" && <TasksScreen />}
        {activeTab === "bands" && <BandssScreen />}
        {activeTab === "myFiles" && <MyFilesScreen />}
      </View>

      <View style={styles.navBar}>
        <NavItem
          name="person"
          isActive={activeTab === "myProfile"}
          onPress={() => setActiveTab("myProfile")}
        />
        <NavItem
          name="musical-notes"
          isActive={activeTab === "bands"}
          onPress={() => setActiveTab("bands")}
        />
        <NavItem
          name="map-marker"
          isActive={activeTab === "map"}
          onPress={() => setActiveTab("map")}
        />
        <NavItem
          name="chatbubble"
          isActive={activeTab === "tasks"}
          onPress={() => setActiveTab("tasks")}
        />
        <NavItem
          name="audio-file"
          isActive={activeTab === "myFiles"}
          onPress={() => setActiveTab("myFiles")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1 },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  backgroundColor: colors.pastelTeal,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
  },
  navItem: { alignItems: "center" },
});
