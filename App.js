import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapScreen from "./screens/MapScreen";
import MainScreen from "./screens/MainScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BillboardTemplate from "./templates/BillboardTemplate";
import BandssScreen from "./screens/BandsScreen";
import BandProfileTemplate from "./templates/BandProfileTemplate";
import NewEventTemplate from "./templates/NewEventTemplate";
import NewSongTemplate from "./templates/NewSongTemplate";
import SongTemplate from "./templates/SongTemplate";
import LyricsFullTemplate from "./templates/LyricsFullTemplate";
import MyFilesScreen from "./screens/MyFilesScreen";
import NewPostTemplate from "./templates/NewPostTemplate";
import ImageEditor from "./components/ImageEditor";

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
        <Stack.Screen name="Billboard" component={BillboardTemplate} />
        <Stack.Screen name="Bands" component={BandssScreen} />
        <Stack.Screen name="BandProfile" component={BandProfileTemplate} />
        <Stack.Screen
          name="NewEvent"
          component={NewEventTemplate}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="NewSong"
          component={NewSongTemplate}
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="Song" component={SongTemplate} />
        <Stack.Screen
          name="LyricsFull"
          component={LyricsFullTemplate}
          options={{
            animation: "slide_from_bottom",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="MyFiles" component={MyFilesScreen} />
        <Stack.Screen name="NewPost" component={NewPostTemplate} 
          options={{
              presentation: "modal",
              animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="ImageEditor" component={ImageEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
