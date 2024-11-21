import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/public/Login';
import Register from '../screens/public/Register';
import Reset from '../screens/public/Reset';
import VerifyEmail from '../screens/public/VerifyEmail';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Sky bank',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName='login'
    >
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='register' component={Register} />
      <Stack.Screen name='verify' component={VerifyEmail} />
      <Stack.Screen name='reset' component={Reset} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
