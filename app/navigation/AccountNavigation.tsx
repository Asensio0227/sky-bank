import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React from 'react';
import Add from '../screens/account/Add';
import Details from '../screens/account/Details';
import Management from '../screens/account/Management';
import Refund from '../screens/account/Refund';
import Statement from '../screens/account/Statement';
import Transaction from '../screens/account/Transaction';
import Transfer from '../screens/account/Transfer';
import Home from '../screens/auth/Home';

const AccountNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='account'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='account' component={Home} />
      <Stack.Screen name='add' component={Add} />
      <Stack.Screen name='management' component={Management} />
      <Stack.Screen name='statement' component={Statement} />
      <Stack.Screen name='transaction' component={Transaction} />
      <Stack.Screen name='transfer' component={Transfer} />
      <Stack.Screen name='refund' component={Refund} />
      <Stack.Screen name='details' component={Details} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
