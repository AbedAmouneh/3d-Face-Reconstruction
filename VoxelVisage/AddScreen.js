import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

const AddScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <LinearGradient colors={["#A48559", "#02131B"]} style={styles.container}>
      <Image
        source={require("./assets/apptitle.png")} 
        style={styles.image}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => console.log("Gallery chosen")}>
            <View style={styles.option}>
              <Text>Add image from gallery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Capture chosen")}>
            <View style={styles.option}>
              <Text>Capture an image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.closeButton}>
              <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  option: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  image: {
    alignSelf: "center", 
    marginTop: 10, 
    flex: 0,
  },
});

export default AddScreen;
