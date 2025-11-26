import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post= ({ data }) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{data.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    minHeight: 450,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
  },
});

export default Post;