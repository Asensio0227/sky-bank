import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React from 'react';
import AdminHome from '../screens/Admin/AdminHome';
import AllAccounts from '../screens/Admin/AllAccounts';
import AllUsers from '../screens/Admin/AllUsers';
import CreateAccount from '../screens/Admin/CreateAccount';
import Loans from '../screens/Admin/Loans';
import SingleUser from '../screens/Admin/SingleUser';
import Transactions from '../screens/Admin/Transactions';

const AdminNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='AdminHome'>
      <Stack.Screen
        name='AdminHome'
        options={{ headerShown: false }}
        component={AdminHome}
      />
      <Stack.Screen
        name='create'
        options={{ title: 'Bank Account' }}
        component={CreateAccount}
      />
      <Stack.Screen
        name='all'
        options={{ title: 'All users' }}
        component={AllUsers}
      />
      <Stack.Screen
        name='allAccounts'
        options={{ title: 'All accounts' }}
        component={AllAccounts}
      />
      <Stack.Screen
        name='loans'
        options={{ title: 'Loans' }}
        component={Loans}
      />
      <Stack.Screen
        name='transactions'
        options={{ title: 'Transactions' }}
        component={Transactions}
      />
      <Stack.Screen
        name='user'
        options={{ title: 'Person Info' }}
        component={SingleUser}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigation;
