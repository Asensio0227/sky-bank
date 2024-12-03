import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootUserState } from '../features/user/types';
import { clearFilters, handleChange } from '../features/user/userSlice';
import Button from './custom/Button';
import AppTextInput from './custom/TextInput';
import AppPicker from './Picker';

export interface Option {
  label: string;
  value: string;
}

const SearchContainer = () => {
  const { rolesOptions, isLoading, search, roles, sortOptions, sort } =
    useSelector((store: RootUserState) => store.allUser);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedLanguage, setSelectedLanguage] = useState(roles);
  const [selected, setSelected] = useState(sort);
  const list: Option[] = rolesOptions.map((item: string) => {
    return {
      label: item.charAt(0).toUpperCase() + item.slice(1),
      value: item,
    };
  });
  const items: Option[] = sortOptions.map((item: string) => {
    return {
      label: item.charAt(0).toUpperCase() + item.slice(1),
      value: item,
    };
  });

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'roles', value: selectedLanguage }));
  }, [selectedLanguage, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'search', value: searchTerm }));
  }, [searchTerm]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSelectedLanguage('');
    setSearchTerm('');
    setSelected('');
  };

  return (
    <View style={{ alignSelf: 'center', width: '90%' }}>
      <AppTextInput
        icon='account-search'
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder='Search user....'
      />
      <AppPicker
        items={list}
        selectedValue={selectedLanguage}
        onValueChange={(value) => setSelectedLanguage(value)}
      />
      <AppPicker
        items={items}
        selectedValue={selected}
        onValueChange={(value) => setSelected(value)}
      />
      <Button
        title='clear filters'
        onPress={handleClearFilters}
        style={{ marginBottom: 7, backgroundColor: 'none' }}
      />
    </View>
  );
};

export default SearchContainer;
