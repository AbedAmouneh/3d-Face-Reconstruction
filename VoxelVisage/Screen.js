import React from "react";
import { View, Text } from "react-native";

const Screen = ({ route }) => {
  const { screenName } = route.params || { screenName: "Default Screen" };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{screenName}</Text>
    </View>
  );
};

export default Screen;
