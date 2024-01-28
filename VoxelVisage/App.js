import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SettingsScreen from "./SettingsScreen";
import Screen from "./Screen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "black",
                borderTopColor: "grey", 
                borderTopWidth: 1, 
              },
              null,
            ],
            tabBarShowLabel: false,
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
            component={Screen}
            initialParams={{ screenName: "Add" }}
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
});
