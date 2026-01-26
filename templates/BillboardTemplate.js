import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Billboards } from "../temp_data/Billboards";
import { posts } from "../temp_data/posts";
import Post from "../components/Post";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { getObjectById } from "../utils/DataHandle";
import MembersModal from "../components/MembersModal";
import { getUserId } from "../local_data/UserData";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import AppCloseButton from "../components/AppCloseButton";

export default function BillboardTemplate({ billboardId, closeFunction }) {
  const navigation = useNavigation();
  const billboard = getObjectById(billboardId, Billboards);
  const [modalVisible, setModalVisible] = useState(false);
  const [following, setFollowing] = useState(billboard.userIds.includes(getUserId()));

  const relevantPosts = posts.filter(
    (post) => post.billboardId === billboardId
  ).sort(
    (a, b) => a.title.localeCompare(b.title)
  );

  function handleFollow() {
    if (following){
      Alert.alert(
        `Unfollow ${billboard.name} Billboard?`,
        "",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Unfollow",
            style: "destructive",
            onPress: () => setFollowing(false) // BackEnd.billboards.removeUser(getUserId(), billboardId),
          },
        ],
        { cancelable: true },
      );
    }
    setFollowing(true) // temp, switch with backend
    // BackEnd.billboards.addUser(getUserId(), billboardId)
  };

  function createNewPost() {
      navigation.navigate("NewPost", {
      billboardId: billboardId,
      state: "new",
    })
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.background} onPress={closeFunction}/>
      <View style={styles.container}>
        <AppCloseButton onPress={closeFunction}/>
        <Text style={styles.title}>{billboard.name}</Text>
        <TouchableOpacity
            style={styles.members}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name={"person"} size={15} paddingRight={3} />
            <Text style={{ flex: 1 }}> {billboard.userIds.length} Musicians</Text>
        </TouchableOpacity>
        <MembersModal
          headLine={"Musicians"}
          ids={billboard.userIds}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={{flexDirection: 'row'}}>
          <AppButton
            text={following? "✓ Following": "+ Follow"}
            onPress={handleFollow}
            apllied={following}
          />
          <AppButton
            text={"+ New Post"}
            onPress={createNewPost}
            apllied={false}
          />
        </View>
        {relevantPosts.length > 0 ? (
          <FlatList
            data={relevantPosts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => <Post data={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text style={styles.noPosts}>No posts yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  background: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 0.8,
    width: "95%",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 999,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1000,
  },
  closeText: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
    paddingLeft: 20,
  },
  noPosts: {
    fontStyle: "italic",
  },
   members: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  button: {
    width: 100,
    height: 35,
    borderColor: colors.black,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 15,
    marginHorizontal: 10
  },
  buttonText: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});
