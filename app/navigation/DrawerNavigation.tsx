import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import React from 'react';
import CustomDrawer from '../components/custom/customDrawer';
import { palette } from '../constants/Colors';
import Profile from '../screens/auth/Profile';
import Help from '../screens/route/Help';
import Notifications from '../screens/route/Notifications';
import AccountNavigation from './AccountNavigation';
import AdminNavigation from './AdminNavigation';

type RootStackParamList = {
  Home: undefined;
  login: undefined;
  reset: undefined;
  register: undefined;
  verify: undefined;
  Profile: undefined;
  notify: undefined;
  admin: undefined;
  // admin: undefined;
};

const DrawerNavigation = () => {
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
      <Drawer.Screen
        name='dashboard'
        options={{ title: 'dashboard' }}
        component={AdminNavigation}
      />
      <Drawer.Screen
        name='help'
        options={{ title: 'Help&Support' }}
        component={Help}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
