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
        <Text>Developers:</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  developersContainer: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  developerText: {
    textAlign: "left",
    padding: 10, 
  },
});

export default SettingsScreen;
