import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  TextInput,
  Vibration,
} from "react-native";
import * as Haptics from 'expo-haptics';
import colors from "../constants/colors";

const CHAR_WIDTH = 35;
const DRAG_THRESHOLD = 5; // px

export default function DraggableChord({
  chord,
  draggable,
  onMove,
  onChangeName,
  onDragStart,
  onDragEnd,
  onDelete,
  autoFocus,
}) {
  chord.charIndex = chord.charIndex || 0;
  const translateX = useRef(
    new Animated.Value(chord.charIndex * CHAR_WIDTH)
  ).current;

  const inputRef = useRef(null);
  const isDragging = useRef(false);
  const lastTap = useRef(0);
  const tapTimeout = useRef(null);
  const [localName, setLocalName] = useState(chord.name ?? '');

  // keep latest draggable in a ref so PanResponder handlers see updates
  const draggableRef = useRef(draggable);
  useEffect(() => { draggableRef.current = draggable; }, [draggable]);

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const [chordColor, setChordColor] = useState(colors.appBlueFaded);

  useEffect(() => {
    translateX.setValue(chord.charIndex * CHAR_WIDTH);
    return () => {
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
    };
  }, [chord.charIndex]);

  // focus input if autoFocus prop becomes true
  useEffect(() => {
    if (autoFocus) {
      // enter edit visual state and focus
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 50);
    }
  }, [autoFocus]);

  // if this chord starts empty, autofocus it once on mount / when chord id changes
  const didAutoFocusRef = useRef(false);
  useEffect(() => {
    setLocalName(chord.name ?? '');
    didAutoFocusRef.current = false;
  }, [chord.id]);

  useEffect(() => {
    if (!didAutoFocusRef.current && (chord.name ?? '') === '') {
      didAutoFocusRef.current = true;
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 50);
    }
  }, [chord.id]);

  const panResponder = useRef(
    PanResponder.create({
      // 🔑 START + CAPTURE
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: () => {
        // visual feedback on press
        setChordColor(colors.appBlue);

        isDragging.current = false;
        if (draggableRef.current) {
          onDragStart?.();
          translateX.setOffset(translateX.__getValue());
          translateX.setValue(0);
        }
      },

      onPanResponderMove: (_, gesture) => {
        if (!draggableRef.current) return;

        if (Math.abs(gesture.dx) > DRAG_THRESHOLD) {
          isDragging.current = true;
        }

        translateX.setValue(gesture.dx);
      },

      onPanResponderRelease: () => {
        if (draggableRef.current) translateX.flattenOffset();

        if (!isDragging.current) {
          // handle single vs double tap
          const DOUBLE_TAP_MS = 300;
          const now = Date.now();
          if (lastTap.current && now - lastTap.current < DOUBLE_TAP_MS) {
            // double tap detected
            if (tapTimeout.current) {
              clearTimeout(tapTimeout.current);
              tapTimeout.current = null;
            }
            lastTap.current = 0;
            // animate + vibrate then delete
            Animated.parallel([
              Animated.timing(scale, { toValue: 0.6, duration: 180, useNativeDriver: true }),
              Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
            ]).start(() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              onDelete?.(chord.id);
              onDragEnd?.();
            });
            return;
          }

          // first tap: wait to see if another tap follows
          lastTap.current = now;
          tapTimeout.current = setTimeout(() => {
            // single tap confirmed -> focus input
            inputRef.current?.focus();
            onDragEnd?.();
            lastTap.current = 0;
            tapTimeout.current = null;
          }, DOUBLE_TAP_MS);

          return;
        }

        // ✅ DRAG → snap
        if (draggableRef.current) {
          const newCharIndex = Math.max(
            0,
            Math.round(translateX.__getValue() / CHAR_WIDTH)
          );

          onMove(chord.id, newCharIndex);
          setChordColor(colors.appBlueFaded);
          onDragEnd?.();
        } else {
          // if not draggable, ensure we reset visual state
          setChordColor(colors.appBlueFaded);
          onDragEnd?.();
        }
      },

      onPanResponderTerminate: () => {
        if (draggableRef.current) translateX.flattenOffset();
        onDragEnd?.();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        draggable ? styles.chord : styles.staticChord,
        { transform: [{ translateX }, { scale }], opacity, backgroundColor: chordColor },
      ]}
    >
      {/* Visual only — parent owns gestures */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={localName}
        onChangeText={(text) => { setLocalName(text); onChangeName(chord.id, text); }}
        onBlur={() => {
          setChordColor(colors.appBlueFaded);
          if ((localName ?? '').trim() === '') {
            // delete if still empty on blur
            onDelete?.(chord.id);
          }
        }}
        pointerEvents="none"
        underlineColorAndroid="transparent"
      />
    </Animated.View>
  );
}


const styles = StyleSheet.create({
    chord: {
        position: "absolute",
        top: 0,
        fontSize: 12,
        fontWeight: "600",
        padding: 4,
        borderRadius: 4,
        color: "white",
        minWidth: 25,
        textAlign: "center",
    },
    staticChord: {
        fontSize: 12,
        fontWeight: "600",
        padding: 4,
        borderRadius: 4,
        color: "white",
        minWidth: 25,
        textAlign: "center",
        marginRight: 4,
    },
        input: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.white,
        textAlign: "center",
    },
});
