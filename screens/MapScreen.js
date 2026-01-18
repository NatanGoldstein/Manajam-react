import colors from "../constants/colors";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import {
  closeSearchAnimation,
  openSearchAnimation,
  createSearchAnimation,
} from "../utils/Animation";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import BillboardsLayer from "../components/BillboardsLayer";
import { Billboards } from "../temp_data/Billboards";
import * as Location from "expo-location";
import BillboardTemplate from "../templates/BillboardTemplate";

export default function MapScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);

  const animationSpeed = 150;

  const [animation] = useState(() => createSearchAnimation());

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBillboard, setSelectedBillboard] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeSearchAnimation(animation, animationSpeed);
        setIsOpen(false);
      }
    }, []),
  );

  const toggleSearchScreen = () => {
    openSearchAnimation(animation, animationSpeed, () => {
      navigation.navigate("Search");
      setIsOpen(true);
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.activityBlue} />
        </View>
    );
  }

  const handlePressBillboard = (bb) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: bb.lat + 0.27, // shift down so billboard screen fits on top
          longitude: bb.lon,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        },
        300, // duration in ms
      );
    }

    setTimeout(() => {
      setSelectedBillboard(bb);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        showsUserLocation
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
      >
        <BillboardsLayer
          data={Billboards}
          onPressBillboard={(bb) => handlePressBillboard(bb)}
        />
      </MapView>

      <Image source={require("../assets/appicon.png")} style={styles.logo} />

      <Animated.View
        style={{
          position: "absolute",
          top: animation.top,
          left: animation.left,
          width: animation.width,
          height: animation.height,
          borderRadius: animation.borderRadius,
          backgroundColor: colors.white,
          zIndex: 30,
          shadowColor: colors.black,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <TouchableOpacity onPress={toggleSearchScreen}>
          <Text style={styles.searchPlaceholder}>search here...</Text>
        </TouchableOpacity>
      </Animated.View>

      {selectedBillboard && (
        <BillboardTemplate
          billboardId={selectedBillboard.id}
          closeFunction={() => setSelectedBillboard(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    bottom: 150,
    right: 15,
    width: 48,
    height: 48,
    zIndex: 30,
  shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  searchPlaceholder: {
    fontSize: 16,
  color: colors.darkGray,
    marginTop: 12,
    marginStart: 20,
  },
});
