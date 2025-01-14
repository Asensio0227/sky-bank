import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomDrawer from '../components/custom/customDrawer';
import { palette } from '../constants/Colors';
import { RootState } from '../features/auth/types';
import Profile from '../screens/auth/Profile';
import Notifications from '../screens/message/Notifications';
import AccountNavigation from './AccountNavigation';
import AdminNavigation from './AdminNavigation';
import HelpNavigation from './HelpNavigation';
const DrawerNavigation = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigation: any = useNavigation();

  useEffect(() => {
    if (user?.roles === 'user') {
      navigation.navigate('Home');
    } else {
      navigation.navigate('dashboard');
    }
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: 'Sky Bank',
        headerStyle: { backgroundColor: palette.secondary },
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name='Home' component={AccountNavigation} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen
        name='notify'
        options={{ title: 'Notifications' }}
        component={Notifications}
      />
      {user.roles !== 'user' && (
        <Drawer.Screen
          name='dashboard'
          options={{ title: 'dashboard' }}
          component={AdminNavigation}
        />
      )}
      <Drawer.Screen
        name='help'
        options={{ title: 'Help&Support' }}
        component={HelpNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
