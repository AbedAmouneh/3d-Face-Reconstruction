import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsScreen = () => {
  const developers = [
    "Abed El Fattah Amouneh",
    "Khalil Farhat",
    "Sammy Medawar",
    "Wally El Sayed",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.developersContainer}>
        <Text style={styles.title}>Developers</Text>
        {developers.map((developer, index) => (
          <Text key={index} style={styles.developerText}>
            {developer}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 24,
  },
  developersContainer: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  developerText: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
