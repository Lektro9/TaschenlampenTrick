import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import {Accuracy} from 'expo-location';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashlightMode, setFlashlightMode] = useState("off");
  const [location, setLocation] = useState(null);
  const [locationPermissions, setLocationPermissions] = useState(null);
  const [runLocation, setRunLocation] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      let locationPermissionObject = await Location.requestForegroundPermissionsAsync();
      if (locationPermissionObject.status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLocationPermissions(locationPermissionObject.status)

      return () => clearInterval(interval);
      
    })();
  }, []);

  const triggerLocationScan = () => {
    setRunLocation((prev) => !prev)
    const interval = setInterval(() => {
      Location.watchPositionAsync({accuracy: Accuracy.BestForNavigation}, (locationAfterUpdate) => {
        setLocation(locationAfterUpdate);
      });
    }, 2000);
  }

  useEffect(()=> {
    if(location) {
      const ourPositionX = Math.round(location.coords.latitude * 10000) / 10000
      const ourPositionY = Math.round(location.coords.longitude * 10000) / 10000
      if(ourPositionX === 51.4568 && ourPositionY === 7.9639) {
        toggleTorch()
      } else {
        console.log("noch nicht da")
      }
    }


  }, [location])
  

  function toggleTorch() {
    if(flashlightMode === "off") {
      setFlashlightMode("torch")
      setTimeout(() => { setFlashlightMode("off") }, 250);
      setTimeout(() => { setFlashlightMode("torch") },1500);
      setTimeout(() => { setFlashlightMode("off") },2250);
      setTimeout(() => { setFlashlightMode("torch") }, 2500);
      setTimeout(() => { setFlashlightMode("off") }, 2250);
      setTimeout(() => { setFlashlightMode("torch") }, 3000);
      setTimeout(() => { setFlashlightMode("off") }, 3550);
      setTimeout(() => { setFlashlightMode("torch") },4500);
      setTimeout(() => { setFlashlightMode("off") },4750);
      setTimeout(() => { setFlashlightMode("torch") }, 5000);
      setTimeout(() => { setFlashlightMode("off") }, 5250);
      setTimeout(() => { setFlashlightMode("torch") }, 5500);
      setTimeout(() => { setFlashlightMode("off") },6250);
      setTimeout(() => { setFlashlightMode("torch") },6500);
      setTimeout(() => { setFlashlightMode("off") },7250);
      setTimeout(() => { setFlashlightMode("torch") }, 7500);
      setTimeout(() => { setFlashlightMode("off") }, 8250);
      setTimeout(() => { setFlashlightMode("torch") }, 9000);
      setTimeout(() => { setFlashlightMode("off") }, 9550);
      setTimeout(() => { setFlashlightMode("torch") },10500);
      setTimeout(() => { setFlashlightMode("off") },10750);
      setTimeout(() => { setFlashlightMode("torch") }, 11000);
      setTimeout(() => { setFlashlightMode("off") }, 11500);
      setTimeout(() => { setFlashlightMode("torch") }, 12500);
  
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
            <Text style={styles.text}> START </Text>
            {location && <Text style={styles.text}> {location.coords.latitude} {location.coords.longitude} </Text>}
          </TouchableOpacity>
          <TouchableOpacity disabled={runLocation} onPress={triggerLocationScan}>
          <Text style={styles.text}>Location abfragen</Text>
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
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 38,
    color: 'white',
  },
});