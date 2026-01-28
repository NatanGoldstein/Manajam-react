import React, { useState } from "react";
import { View, TextInput, StyleSheet, PanResponder } from "react-native";
import colors from "../constants/colors";

export default function MoveableTextBox({ color = "#fff", maxWidth = 700 }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(100);
  const [text, setText] = useState("");

  // PanResponder for dragging
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      setPosition({
        x: gestureState.dx,
        y: gestureState.dy,
      });
    },
  });

  // Simple pinch/zoom using two-finger distance
  const handleTouchMove = (e) => {
    if (e.nativeEvent.touches.length === 2) {
      const t1 = e.nativeEvent.touches[0];
      const t2 = e.nativeEvent.touches[1];
      const distance = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY);
      setScale(Math.max(0.5, distance / 150)); // prevents too small
    }
  };

  // Dynamically adjust width based on text, clamped to maxWidth
  const handleContentSizeChange = (e) => {
    const contentWidth = e.nativeEvent.contentSize.width + 20; // padding
    setWidth(Math.min(contentWidth, maxWidth));
  };

  return (
    <View
      {...panResponder.panHandlers}
      onTouchMove={handleTouchMove}
      style={[
        styles.container,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale },
          ],
        },
      ]}
    >
      <TextInput
        placeholder="Type text"
        placeholderTextColor="#aaa"
        style={[styles.text, { color, width }]}
        multiline={false}
        value={text}
        onChangeText={setText}
        onContentSizeChange={handleContentSizeChange}
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "50%", // centered horizontally
    top: "50%",  // centered vertically
    transform: [{ translateX: -50 }], // initial offset to roughly center
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 6,
    padding: 2,
    backgroundColor: "rgba(0,0,0,0.2)", // optional subtle background
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    padding: 8,
  },
});
