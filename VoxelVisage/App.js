import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./src/components/Camera";
import SettingsScreen from "./SettingsScreen";
import Screen from "./Screen";

const Tab = createBottomTabNavigator();

const CameraTabButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.cameraButton}>
    <Image
      source={require("./assets/camera.png")}
      style={{ tintColor: "white", width: 35, height: 35 }}
    />
  </TouchableOpacity>
);

export default function App() {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleRemoveImage = () => {
    if (capturedImage) {
      setCapturedImage(null);
    } else {
      Alert.alert("No Captured Image", "You have not captured an image.");
    }
  };

  const handleCameraButtonPress = () => {};

  return (
      <NavigationContainer>
        <LinearGradient
          colors={["#A48559", "#02131B"]}
          style={styles.container}
        >
          <Tab.Navigator
            initialRouteName="Camera"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: "black",
                borderTopColor: "grey",
                borderTopWidth: 1,
              },
              tabBarShowLabel: false,
              tabBarActiveTintColor: "white",
            }}
          >
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Image
                    source={require("./assets/settings-icon.png")}
                    style={{ tintColor: color, width: size, height: size }}
                  />
                ),
              }}
            />


            <Tab.Screen
              name="Camera"
              component={CameraScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <CameraTabButton onPress={handleCameraButtonPress} />
                ),
              }}
            />


          </Tab.Navigator>
        </LinearGradient>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
