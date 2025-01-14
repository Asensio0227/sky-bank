import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearStatementFilters,
  setFilters,
} from '../../features/statement/statementSlice';
import { RootStatementState } from '../../features/statement/type';
import { formatArray } from '../../utils/format';
import { Option } from '../acc/SearchContainer';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';
import AppPicker from '../Picker';

const StatementFilter = () => {
  const { sortOptions, search, sort, isLoading } = useSelector(
    (store: RootStatementState) => store.Statement
  );
  const [searchTerm, setSearchTerm] = useState(search);
  const [selected, setSelected] = useState(sort);
  const sortOp: Option[] = formatArray(sortOptions);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    dispatch(setFilters({ name: 'search', value: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(setFilters({ name: 'sort', value: selected }));
  }, [selected]);

  const handleClearFilters = () => {
    dispatch(clearStatementFilters());
    setSearchTerm('');
    setSelected('');
  };

  return (
    <View
      style={{
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'center',
        marginTop: 25,
      }}
    >
      <AppTextInput
        icon='account-search'
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder='Search......'
      />
      <AppPicker
        label='Sort'
        items={sortOp}
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

export default StatementFilter;

const styles = StyleSheet.create({});
