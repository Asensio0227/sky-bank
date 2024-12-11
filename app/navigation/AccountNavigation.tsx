import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React from 'react';
import ModalScreen from '../components/ModalScreen';
import Add from '../screens/account/Add';
import ApplyForLoan from '../screens/account/ApplyForLoan';
import Details from '../screens/account/Details';
import Information from '../screens/account/Information';
import Loan from '../screens/account/Loan';
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
      <Stack.Screen name='loan' options={{ title: 'Loan' }} component={Loan} />
      <Stack.Screen
        name='info'
        options={{ title: 'Information' }}
        component={Information}
      />
      <Stack.Screen
        name='apply'
        options={{ title: 'Apply For loan' }}
        component={ApplyForLoan}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AccountNavigation;
