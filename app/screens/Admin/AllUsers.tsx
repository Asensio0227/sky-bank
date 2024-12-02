import React from 'react';
import { StyleSheet } from 'react-native';
import SearchContainer from '../../components/SearchContainer';
import UserList from '../../components/UserList';

const AllUsers = () => {
  return (
    <>
      <SearchContainer />
      <UserList />
    </>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
