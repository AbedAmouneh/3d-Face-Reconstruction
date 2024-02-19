import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [focusing, setFocusing] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setFocusing(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      setCapturedImage(data);
      setFocusing(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCapturedImage(result);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const { width, height } = Dimensions.get("window");
  const imageSize = { width: width * 1, height: height * 0.9}; 

  const circleSize = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 50, 0],
  });

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
              zIndex: 4,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Image
              source={require("../../assets/flip-camera-icon.png")}
              style={{ tintColor: "white", width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: "flex-end",
              alignItems: "center",
              zIndex: 2,
            }}
            onPress={takePicture}
          >
            <Image
              source={require("../../assets/camera.png")}
              style={{ tintColor: "white", width: 60, height: 60 }}
            />
            {focusing && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  backgroundColor: "transparent",
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 25,
                  width: circleSize,
                  height: circleSize,
                  transform: [{ translateX: -25 }, { translateY: -25 }],
                  zIndex: 3,
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
              zIndex: 2,
            }}
            onPress={pickImage}
          >
            <Image
              source={require("../../assets/gallery-icon.png")}
              style={{ tintColor: "white", width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedImage && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={{ uri: capturedImage.uri }} style={imageSize} />
          </View>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
