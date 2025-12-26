import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import MainScreen from "./screens/MainScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BillboardScreen from "./screens/BillboardScreen";
import BandssScreen from "./screens/BandsScreen";
import BandProfileScreen from "./screens/BandProfileScreen";
import NewEventScreen from "./screens/NewEventScreen";
import NewSongScreen from "./screens/NewSongScreen";
import SongScreen from "./screens/SongScreen";
import LyricsFullScreen from "./screens/LyricsFullScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            animation: "none",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            animation: "none",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Billboard" component={BillboardScreen} />
        <Stack.Screen name="Bands" component={BandssScreen} />
        <Stack.Screen name="BandProfile" component={BandProfileScreen} />
        <Stack.Screen
          name="NewEvent"
          component={NewEventScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="NewSong"
          component={NewSongScreen}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="Song" component={SongScreen} />
        <Stack.Screen
          name="LyricsFull"
          component={LyricsFullScreen}
          options={{
            animation: "slide_from_bottom",
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
