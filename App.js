import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import customStyle from "./customStyle.js";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [location, setLocation] = useState(null);
  const [type, seType] = useState("standard");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={
          !location
            ? {
                latitude: 74,
                longitude: 18,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
        }
        customMapStyle={customStyle}
        showsUserLocation
        loadingEnabled
        style={styles.mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
      <TouchableOpacity 
        style={styles.maptipo}
        onPress={() => {
          seType(
            type ===  'standard' ? 'satellite' : 'standard'
          )
        }}
      >
        <FontAwesome  name="map" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  maptipo: {
    position: "absolute",
    top: 750,
    left: 350,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
  },
});
