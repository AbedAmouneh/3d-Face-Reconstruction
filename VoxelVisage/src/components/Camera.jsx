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
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = React.memo(() => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [focusing, setFocusing] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };

    checkPermissions();

    return () => {
      animation.removeAllListeners();
    };
  }, [animation]);

  const onSingleTapEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { x, y } = event.nativeEvent;
      handleFocus({ x, y });
    }
  };

  const handleFocus = async ({ x, y }) => {
    setFocusing(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
      setFocusing(false);
    });

    const { width, height } = Dimensions.get("window");
    const focusX = x / width;
    const focusY = y / height;

    try {
      await cameraRef.current?.setFocusPointAsync({ x: focusX, y: focusY });
    } catch (error) {
      console.error("Error setting focus point:", error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      setFocusing(true);

      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        animation.setValue(0);
        setFocusing(false);
      });

      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      setCapturedImage(data);
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

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const { width, height } = Dimensions.get("window");
  const imageSize = { width: width * 1, height: height * 0.9 };

  const circleRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={cameraRef}
          flashMode={flashMode}
          onTouch={(e) => {
            const { x, y } = e.nativeEvent;
            handleFocus({ x, y });
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
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
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: [{ translateX: -28 }],
                zIndex: 2,
              }}
              onPress={takePicture}
            >
              <Image
                source={require("../../assets/Shutter.png")}
                style={{ tintColor: "white", width: 65, height: 65 }}
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
                    width: 50,
                    height: 50,
                    transform: [
                      { translateX: -25 },
                      { translateY: -25 },
                      { rotate: circleRotation },
                    ],
                    zIndex: 3,
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
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
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-start",
                alignItems: "center",
                zIndex: 2,
                marginLeft: "auto",
                marginRight: 14,
                marginTop: 16,
              }}
              onPress={toggleFlash}
            >
              <Image
                source={
                  flashMode === Camera.Constants.FlashMode.off
                    ? require("../../assets/flash-off.png")
                    : require("../../assets/flash-on.png")
                }
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
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={{ uri: capturedImage.uri }} style={imageSize} />
              <TouchableOpacity onPress={() => setCapturedImage(null)}>
                <Text style={{ color: "white", marginTop: 10 }}>
                  Remove Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
});

export default CameraScreen;
