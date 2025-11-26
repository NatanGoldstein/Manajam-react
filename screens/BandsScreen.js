import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bands } from "../temp_data/Bands";
import BandHeader from "../components/BandHeader";

export default function BandssScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.headLine}>My Bands</Text>
      <ScrollView>
        {bands.map((band) => (
          <BandHeader key={band.id} band={band} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  headLine: {
    height: 50,
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 10,
  },
});
