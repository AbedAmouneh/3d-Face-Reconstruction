// MainScreen.js
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MainScreen = () => {
  return (
    <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
