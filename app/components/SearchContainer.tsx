import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { UserState } from '../features/user/types';

const SearchContainer = () => {
  const { rolesOptions } = useSelector((store: UserState) => store);
  const handleSearch = (e) => {
    console.log(e.target);
  };
  return (
    <View>
      <View>
        <Text>Search</Text>
      </View>
      <TextInput
        value='search'
        onChangeText={handleSearch}
        placeholder='Search user by idea number'
      />
      {/* <AppPicker list={['all', ...rolesOptions]} /> */}
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({});
