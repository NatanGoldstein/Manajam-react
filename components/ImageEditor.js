import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../constants/colors";
import AppCloseButton from "./AppCloseButton";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AppButton from "./AppButton";
import { Feather } from "@expo/vector-icons";
import { pickImageFromLibrary } from "../utils/ImagePicker";
import MoveableTextBox from "./MoveableTextBox";


export default function ImageEditor() {
    const route = useRoute();
    const { image, setImageUrl } = route.params;
  const [currentUri, setCurrentUri] = useState(image.uri);
  const [rotation, setRotation] = useState(0);
  const navigation = useNavigation();
  const [showText, setShowText] = useState(false);


  const rotateImage = async () => {
    const result = await ImageManipulator.manipulateAsync(
      currentUri,
      [{ rotate: 90 }],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    setRotation(rotation + 90);
    setCurrentUri(result.uri);
  };

  const saveImage = async () => {
    setImageUrl(currentUri);
    navigation.goBack()
  };

  async function handleImageChange() {
    const image = await pickImageFromLibrary();
    setCurrentUri(image.uri)
  };

  return (
    <View style={styles.container}>
      <AppCloseButton color={colors.white}/>
      <View style={styles.imageContainer}>
        <Image source={{ uri: currentUri }} style={styles.image} />
        {showText && <MoveableTextBox color={colors.white} />}
        <TouchableOpacity 
            style={{position: 'absolute', top: 15, left: 15}}
            onPress={() => handleImageChange()}
        >
            <Feather name="edit-2" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomLine}>
        <View style={styles.toolbar}>
            <TouchableOpacity onPress={rotateImage}>
                <AntDesign name={"rotate-right"} size={30} style={styles.icon} />
            <Text style={styles.button}>Rotate</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowText(true)}>
                <Ionicons name={"text"} size={30} style={styles.icon} />
            <Text style={styles.button}>Add Text</Text>
            </TouchableOpacity>
        </View>
        <AppButton text={"Save"} apllied={true} onPress={saveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    zIndex: 999,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  bottomLine: {
    backgroundColor: "#111",
    paddingBottom: 30,
  },
  button: {
    color: "#fff",
    fontSize: 14,
  },
  buttonPrimary: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    color: colors.white,
    marginBottom: 10,
    alignSelf: 'center'
  },
});
