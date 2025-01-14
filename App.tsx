import {
  Inter_400Regular,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Loading from './app/components/custom/Loading';
import Screen from './app/components/custom/Screen';
import { loadUser } from './app/features/auth/authSlice';
import { RootState } from './app/features/auth/types';
import { usePushNotifications } from './app/hooks/useNotifications';
import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { store } from './store';

SplashScreen.preventAutoHideAsync();
function Layout() {
  const { user, isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_400Regular,
  });
  const { expoPushToken } = usePushNotifications();
  // console.log(`===user====`);
  // console.log(user);
  // console.log(`===user====`);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded, fontError]);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          await dispatch(loadUser());
        }
      } catch (error: any) {
        console.log('Error while loading user', error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  if (!isReady) return null;

  return (
    <Screen onLayout={onLayoutRootView}>
      <NavigationContainer>
        {user ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </Screen>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
