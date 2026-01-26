import React, { use, useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { songs } from "../temp_data/Songs";
import { getObjectById } from "../utils/DataHandle";
import { bands } from "../temp_data/Bands";
import Collapsible from "react-native-collapsible";
import { selectionAsync } from "expo-haptics";
import colors from "../constants/colors";
import AppButton from "../components/AppButton";
import { pickImageFromLibrary } from "../utils/ImagePicker";
import ImageEditor from "../components/ImageEditor";
import AppCloseButton from "../components/AppCloseButton";

export default function NewPostTemplate() {
  const route = useRoute();
  const navigation = useNavigation();
  const { post, billboardId, state } = route.params;
  const [createdAt, setCreatedAt] = useState(new Date());
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [showFloatingWindow, setShowFloatingWindow] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [finalImageUri, setFinalImageUri] = useState(null);

  function handleState() {
    if (state == "edit") {
      setCreatedAt(post.createdAt);
      setTitle(post.title);
      setDetails(post.details);
      setImageUrl(post.imageUrl);
    }
  }

  function handleSubmit() {
    alert("Submitting...");
    // Placeholder — will connect to backend later
  }

  async function handleUploadImage () {
    const image = await pickImageFromLibrary();
    if (!image) return;

    setPickedImage(image);
    setShowFloatingWindow(false);
    navigation.navigate("ImageEditor", {
          image: image,
          setImageUrl: setImageUrl,
        })
  }

  return (
    <View style={{flex: 1}}>
      <AppCloseButton/>
      <Text style={styles.headerTitle}>
        {state == "new" ? "New Post" : "Edit Post"}
      </Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TextInput
          style={styles.input}
          placeholder="Post Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          value={details}
          style={styles.input}
          placeholder="Details"
          onChangeText={setDetails}
        />
        <View style={styles.block}>
          <View style={styles.row2}>
            <Text style={styles.header}>Add Image</Text>
            <TouchableOpacity onPress={() => setShowFloatingWindow(!showFloatingWindow)}>
              <Ionicons name={"add-circle"} size={30} />
            </TouchableOpacity>
          </View>
          {imageUrl && <Image 
            source={{ uri: imageUrl }}
            style={styles.image}
          />}
        </View>
        <AppButton
          text={state == "new" ? "Create" : "Update"}
          onPress={handleSubmit}
          apllied={false}
        />
        {showFloatingWindow && (
        <View style={[styles.floatingWindow, {right: 30, top: 195}]}>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => { handleUploadImage() }}
          >
            <Ionicons name="folder-open-outline" size={22} color={colors.darkGray} style={{ marginRight: 6 }} />
            <Text style={styles.floatingButtonText}>Upload Image</Text>
          </TouchableOpacity>
          <View style={styles.line}/>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {   
              // TODO: add upload local file logic
            }}
          >
            <Ionicons name="add-circle" size={22} color={colors.darkGray} style={{ marginRight: 6 }} />
            <Text style={styles.floatingButtonText}>Create Poster</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 15,
    paddingBottom: 60,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    zIndex: 50,
  },
  headerTitle: {
    padding: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.appBlue,
  },
  block: {
  backgroundColor: colors.white68,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    maxHeight: 400,
  },
  row1: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10,
  },
  row2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  songs: {
    alignSelf: "flex-start",
    fontSize: 15,
    margin: 5,
  },
  drawer: {
    width: 320,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
  backgroundColor: colors.white,
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  timeInput: {
    width: 120,
    height: 40,
    borderRadius: 7,
    textAlign: "center",
    fontSize: 17,
  backgroundColor: colors.overlayGray55,
  },
  button: {
    backgroundColor: colors.black,
    width: 200,
    padding: 15,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    margin: 30,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 18,
  },
  floatingWindow: {
    position: "absolute",
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    alignItems: "center",
    zIndex: 9999,
  },
  floatingButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    width: '100%',
  },
  floatingButtonText: { 
  color: colors.darkGray, 
    fontWeight: "500" 
  },
    line: {
    width: '112%',
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
    image: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },
});
