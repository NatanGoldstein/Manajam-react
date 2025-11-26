import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { setUserId } from "../local_data/UserData";

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // 🔐 Placeholder backend auth logic
    console.log("Logging in with:", email, password);
    setUserId(1); // to be replaced with acctual user login id
    // ✅ Navigate to main screen
    navigation.replace("Main"); // replaces stack so user can't go "back" to login
  }

  return (
    <ImageBackground
      source={require("../assets/login_back.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={10} // Adjust as needed
      >
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="rgba(16, 4, 4, 0.32)"
          marginTop="1"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="rgba(16, 4, 4, 0.32)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    verticalAlign: "top",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "rgb(3, 1, 48)",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  link: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 1,
    textDecorationLine: "underline",
  },
});
