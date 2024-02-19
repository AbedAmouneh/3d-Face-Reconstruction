import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
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
      style={{ tintColor: "white", width: 30, height: 30 }}
    />
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer
      onStateChange={(state) => console.log("New state is", state)}
    >
      <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container}>
        <Tab.Navigator
          initialRouteName="Camera"
          screenOptions={{
            tabBarStyle: [
              {
                backgroundColor: "black",
                borderTopColor: "grey",
                borderTopWidth: 1,
              },
              null,
            ],
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
            name="Close"
            component={Screen}
            initialParams={{ screenName: "Close" }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/close-icon.png")}
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
                <Image
                  source={require("./assets/add-icon.png")}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Download"
            component={Screen}
            initialParams={{ screenName: "Download" }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/download-icon.png")}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Save"
            component={Screen}
            initialParams={{ screenName: "Save" }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/save-icon.png")}
                  style={{ tintColor: color, width: size, height: size }}
                />
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
