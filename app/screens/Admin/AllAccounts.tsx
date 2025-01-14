import React from 'react';
import { Account, SearchContainer } from '../../components/acc';
import ProtectedScreen from '../ProtectedScreen';

const AllAccounts = () => {
  return (
    <ProtectedScreen>
      <SearchContainer />
      <Account />
    </ProtectedScreen>
  );
};

export default AllAccounts;
