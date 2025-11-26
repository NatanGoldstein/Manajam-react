import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapScreen from "./MapScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TasksScreen from "./TasksScreen";
import BandssScreen from "./BandsScreen";
import ProfileScreen from "./ProfileScreen";

function NavItem({ name, isActive, onPress }) {
  const IconComponent =
    name === "map-marker" ? MaterialCommunityIcons : Ionicons;
  const size = name === "map-marker" ? 40 : 30;

  return (
    <TouchableOpacity onPress={onPress} style={styles.navItem}>
      <IconComponent
        name={name}
        size={size}
        color={isActive ? "rgb(2, 150, 255)" : "#000"}
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
      </View>

      <View style={styles.navBar}>
        <NavItem
          name="map-marker"
          isActive={activeTab === "map"}
          onPress={() => setActiveTab("map")}
        />
        <NavItem
          name="musical-notes"
          isActive={activeTab === "bands"}
          onPress={() => setActiveTab("bands")}
        />
        <NavItem
          name="checkbox-outline"
          isActive={activeTab === "tasks"}
          onPress={() => setActiveTab("tasks")}
        />
        <NavItem
          name="person"
          isActive={activeTab === "myProfile"}
          onPress={() => setActiveTab("myProfile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    backgroundColor: "rgb(190, 210, 209)",
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
  },
  navItem: { alignItems: "center" },
});
