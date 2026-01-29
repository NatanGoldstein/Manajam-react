import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  PanResponder,
} from "react-native";

export default function MoveableTextBox() {
  const [text, setText] = useState("Tap to edit");
  const [editing, setEditing] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(120);

  const startPos = useRef({ x: 0, y: 0 });
  const startTouches = useRef(null);
  const tapTimeout = useRef(null);
  const activeTouches = useRef(0);

  /* ---------------- DRAG (1 finger only) ---------------- */

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e) => {
      activeTouches.current = e.nativeEvent.touches.length;
      return activeTouches.current === 1;
    },

    onMoveShouldSetPanResponder: (e) =>
      e.nativeEvent.touches.length === 1,

    onPanResponderGrant: () => {
      startPos.current = position;

      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 180);
    },

    onPanResponderMove: (_, gesture) => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
      }

      setPosition({
        x: startPos.current.x + gesture.dx,
        y: startPos.current.y + gesture.dy,
      });
    },

    onPanResponderRelease: () => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current);
        tapTimeout.current = null;
        setEditing(true);
      }
    },
  });

  /* ---------------- PINCH + ROTATE (2 fingers) ---------------- */

  const onTouchMove = (e) => {
    if (e.nativeEvent.touches.length !== 2) {
      startTouches.current = null;
      return;
    }

    const [a, b] = e.nativeEvent.touches;
    const dx = b.pageX - a.pageX;
    const dy = b.pageY - a.pageY;

    const distance = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    if (!startTouches.current) {
      startTouches.current = { distance, angle };
      return;
    }

    setScale((prev) =>
      Math.max(0.4, prev * (distance / startTouches.current.distance))
    );

    setRotation((prev) => prev + angle - startTouches.current.angle);

    startTouches.current = { distance, angle };
  };

  /* ---------------- WIDTH AUTO-FIT ---------------- */

  const onContentSizeChange = (e) => {
    setWidth(Math.min(e.nativeEvent.contentSize.width + 20, 320));
  };

  return (
    <View
      {...panResponder.panHandlers}
      onTouchMove={onTouchMove}
      style={[
        styles.box,
        {
          width,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale },
            { rotate: `${rotation}rad` },
          ],
        },
      ]}
    >
      <TextInput
        value={text}
        editable={editing}
        autoFocus={editing}
        onBlur={() => setEditing(false)}
        onChangeText={setText}
        onContentSizeChange={onContentSizeChange}
        style={styles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    left: "50%",
    top: "50%",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  text: {
    fontSize: 28,
    color: "#fff",
    padding: 8,
    textAlign: "center",
    fontWeight: "600",
  },
});
