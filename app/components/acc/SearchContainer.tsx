import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  handleChange,
} from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';
import AppPicker from '../Picker';

export interface Option {
  label: string;
  value: string;
}

const SearchContainer = () => {
  const {
    accountTypeOptions,
    isLoading,
    search,
    accountType,
    sortOptions,
    sort,
  } = useSelector((store: RootAccountState) => store.allAccounts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedLanguage, setSelectedLanguage] = useState(accountType);
  const [selected, setSelected] = useState(sort);
  const list: Option[] = accountTypeOptions.map((item: string) => {
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
    dispatch(handleChange({ name: 'accountType', value: selectedLanguage }));
  }, [selectedLanguage, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'search', value: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'sort', value: selected }));
  }, [selected]);

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
        placeholder='Search......'
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
