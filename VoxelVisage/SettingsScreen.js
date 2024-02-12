import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const SettingsScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const developers = [
    "Abed El Fattah Amouneh",
    "Khalil Farhat",
    "Sammy Medawar",
    "Wally El Sayed",
  ];

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkModeContainer]}>
      <View style={styles.settingsContainer}>
        <Text style={[styles.title, darkModeEnabled && styles.darkModeText]}>App Settings</Text>

        <View style={styles.settingRow}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkModeText]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationEnabled}
            onValueChange={(value) => setNotificationEnabled(value)}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingText, darkModeEnabled && styles.darkModeText]}>
            Dark Mode
          </Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>

      <View style={styles.developersContainer}>
        <Text style={[styles.title, darkModeEnabled && styles.darkModeText]}>Developers</Text>
        {developers.map((developer, index) => (
          <Text key={index} style={[styles.developerText, darkModeEnabled && styles.darkModeText]}>
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
  darkModeContainer: {
    backgroundColor: "black",
  },
  darkModeText: {
    color: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 24,
  },
  settingsContainer: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  settingText: {
    fontSize: 16,
  },
  developersContainer: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  developerText: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    color: "black",
  },
});

export default SettingsScreen;
