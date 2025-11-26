import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Event from "./Event";
import { events } from "../temp_data/Events";
import { getObjectById } from "../utils/DataHandle";

export default function BandScheduleTab({ band, navigation }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("NewEvent", {
            event: { bandId: band.id },
            state: "new",
          })
        }
      >
        <Text style={styles.addButtonText}>+ New Event</Text>
      </TouchableOpacity>
      <ScrollView style={styles.sectionContent}>
        {band.eventIds.map((eventId) => {
          const event = getObjectById(eventId, events);
          if (!event) {
            return null;
          }
          return <Event key={eventId} event={event} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: 120,
    height: 45,
    marginBottom: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionContent: {
    minHeight: 600,
  },
});
