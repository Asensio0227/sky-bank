import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import React from 'react';
import CustomDrawer from '../components/custom/customDrawer';
import { palette } from '../constants/Colors';
import Help from '../screens/route/Help';
import Loans from '../screens/route/Loans';
import Notifications from '../screens/route/Notifications';
import AccountNavigation from './AccountNavigation';

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
      <Drawer.Screen name='loans' component={Loans} />
      <Drawer.Screen name='notify' component={Notifications} />
      <Drawer.Screen name='help' component={Help} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
