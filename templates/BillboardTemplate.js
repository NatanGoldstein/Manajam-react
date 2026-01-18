import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Billboards } from "../temp_data/Billboards";
import { posts } from "../temp_data/posts";
import Post from "../components/Post";
import colors from "../constants/colors";

export default function BillboardTemplate({ billboardId, closeFunction }) {
  const billboard = Billboards.find((b) => b.id === billboardId);

  const relevantPosts = posts.filter(
    (post) => post.billboardId === billboardId
  ).sort(
    (a, b) => a.title.localeCompare(b.title)
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={closeFunction}>
          <Text style={styles.closeText}>x</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{billboard.name}</Text>

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
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  container: {
    flex: 0.8,
    width: "95%",
    alignSelf: "center",
  backgroundColor: colors.white,
    borderRadius: 20,
  padding: 15,
  shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
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
    marginBottom: 15,
  },
  noPosts: {
    fontStyle: "italic",
  },
});
