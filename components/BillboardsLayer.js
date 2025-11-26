import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BillboardsLayer({ data, onPressBillboard }) {
  return (
    <>
      {data.map((bb) => (
        <Marker
          key={bb.id}
          coordinate={{ latitude: bb.lat, longitude: bb.lon }}
          onPress={() => onPressBillboard?.(bb)}
          tracksViewChanges={false}
        >
            <View style={styles.billboardContainer}>
                <View style={styles.rectangle}>
                <MaterialCommunityIcons name="sign-text" size={20} color="white" />
                </View>
                <View style={styles.triangle} />
            </View>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  billboardContainer: {
    alignItems: 'center',
  },
  rectangle: {
    backgroundColor: 'black', // wood-ish background
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  triangle: {
    width: 10,
    height: 100,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'black', // matches border (like a pointer)
  },
})
