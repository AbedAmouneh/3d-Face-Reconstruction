import React, { useState } from "react";
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./src/components/Camera";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

const CameraTabButton = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const handleCameraButtonPress = () => {
    // Navigate to the "Camera" screen
    navigation.navigate("Camera");
  };

  return (
    <TouchableOpacity
      onPress={handleCameraButtonPress}
      style={styles.cameraButton}
    >
      <Image
        source={require("./assets/camera.png")}
        style={{
          width: 35,
          height: 35,
          tintColor: isFocused ? "white" : "grey",
        }}
      />
    </TouchableOpacity>
  );
};

export default function App() {
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <NavigationContainer>
      <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container}>
        <Tab.Navigator
          initialRouteName="Camera"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "black",
              borderColor: "grey",
              borderWidth: 2,
              borderRadius: 25,
              margin: 8,
              width: "50%",
              alignSelf: "center",
              justifyContent: "center",
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
                  style={{ tintColor: color, width: 35, height: 35 }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              tabBarIcon: ({ color, size }) => <CameraTabButton />,
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
