// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "./src/components/Camera";
import AddScreen from "./AddScreen";
import SettingsScreen from "./SettingsScreen";
import Screen from "./Screen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      onStateChange={(state) => console.log("New state is", state)}
    >
      <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container}>
        <Tab.Navigator
          initialRouteName="Add"
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
            name="Add"
            component={AddScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require("./assets/add-icon.png")}
                  style={{
                    tintColor: color,
                    width: size * 1.3,
                    height: size * 1.3,
                  }}
                />
              ),
              headerShown: false,
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
          // Inside the createBottomTabNavigator
<Tab.Screen
  name="Camera"
  component={Camera}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Image
        source={require("./assets/camera-icon.png")} // Replace with your camera icon source
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
});
