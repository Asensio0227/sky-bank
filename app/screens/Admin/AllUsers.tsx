import React from 'react';
import SearchContainer from '../../components/user/SearchContainer';
import UserList from '../../components/user/UserList';
import ProtectedScreen from '../ProtectedScreen';

const AllUsers = () => {
  return (
    <ProtectedScreen>
      <SearchContainer />
      <UserList />
    </ProtectedScreen>
  );
};

export default AllUsers;
