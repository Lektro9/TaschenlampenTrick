import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashlightMode, setFlashlightMode] = useState("off");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function toggleTorch() {
    if(flashlightMode === "off") {
      setFlashlightMode("torch")
      setTimeout(() => { setFlashlightMode("off") }, 250);
      setTimeout(() => { setFlashlightMode("torch") },1500);
      setTimeout(() => { setFlashlightMode("off") },1750);
      setTimeout(() => { setFlashlightMode("torch") }, 2000);
      setTimeout(() => { setFlashlightMode("off") }, 2250);
      setTimeout(() => { setFlashlightMode("torch") }, 2500);
      setTimeout(() => { setFlashlightMode("off") }, 3250);
      setTimeout(() => { setFlashlightMode("torch") },4500);
      setTimeout(() => { setFlashlightMode("off") },4750);
      setTimeout(() => { setFlashlightMode("torch") }, 5000);
      setTimeout(() => { setFlashlightMode("off") }, 5250);
      setTimeout(() => { setFlashlightMode("torch") }, 5500);
    } else {
      setFlashlightMode("off")
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flashlightMode}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleTorch}>
            <Text style={styles.text}> LICHT </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 38,
    color: 'white',
  },
});