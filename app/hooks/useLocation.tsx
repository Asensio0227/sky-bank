import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let {
          coords: { longitude, latitude },
        } = await Location.getCurrentPositionAsync();
        let url = `https://us1.locationiq.com/v1/reverse?key=pk.8e3af0f9e0175c0341d0ff92e396bb75&lat=${latitude}&lon=${longitude}&format=json&`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! location status: ${response.status}`);
        }
        const data = await response.json();
        setLocation(data.display_name);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return { location, errorMsg };
}
