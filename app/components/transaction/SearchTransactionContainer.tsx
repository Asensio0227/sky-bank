import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/auth/types';
import {
  clearFilter,
  handleChange,
} from '../../features/transaction/transactionSlice';
import { RootTransactionState } from '../../features/transaction/types';
import { formatArray } from '../../utils/format';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';
import AppPicker from '../Picker';

export interface Option {
  label: string;
  value: string;
}

const SearchTransactionContainer = () => {
  const {
    accountTypeOptions,
    transactionOption,
    typeOptions,
    statusOptions,
    sortOptions,
    type,
    isLoading,
    status,
    transactionType,
    accountType,
    reversalOptions,
    reversal,
    sort,
    search,
  } = useSelector((store: RootTransactionState) => store.AllTransactions);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState(search);
  const [searchTerm, setSearchTerm] = useState(status);
  const [selected, setSelected] = useState(sort);
  const [selectedLanguage, setSelectedLanguage] = useState(accountType);
  const [transaction, setTransaction] = useState(transactionType);
  const [reverse, setReverse] = useState(reversal);
  const [types, setTypes] = useState(type);
  const list: Option[] = formatArray(accountTypeOptions);
  const sortOp: Option[] = formatArray(sortOptions);
  const transactionOp: Option[] = formatArray(transactionOption);
  const typeOp: Option[] = formatArray(typeOptions);
  const statusOp: Option[] = formatArray(statusOptions);
  const reversalOp: Option[] = formatArray(reversalOptions);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'search', value: input }));
  }, [input]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'accountType', value: selectedLanguage }));
  }, [selectedLanguage]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'status', value: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'reversal', value: reverse }));
  }, [reverse]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'sort', value: selected }));
  }, [selected]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'transactionType', value: transaction }));
  }, [transaction]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'type', value: types }));
  }, [types]);

  const handleClearFilters = () => {
    dispatch(clearFilter());
    setSelectedLanguage('');
    setTransaction('');
    setTypes('');
    setSearchTerm('');
    setSelected('');
    setReverse('');
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
      {user.roles !== 'user' && (
        <AppTextInput
          icon='account-search'
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder='Search......'
        />
      )}
      <AppPicker
        label='Account Type'
        items={list}
        selectedValue={selectedLanguage}
        onValueChange={(value) => setSelectedLanguage(value)}
      />
      <AppPicker
        label='Sort'
        items={sortOp}
        selectedValue={selected}
        onValueChange={(value) => setSelected(value)}
      />
      <AppPicker
        label='Status'
        items={statusOp}
        selectedValue={searchTerm}
        onValueChange={(value) => setSearchTerm(value)}
      />
      <AppPicker
        label='Transaction'
        items={transactionOp}
        selectedValue={transaction}
        onValueChange={(value) => setTransaction(value)}
      />
      <AppPicker
        label='Type'
        items={typeOp}
        selectedValue={types}
        onValueChange={(value) => setTypes(value)}
      />
      <AppPicker
        label='Reversals'
        items={reversalOp}
        selectedValue={reverse}
        onValueChange={(value) => setReverse(value)}
      />
      <Button
        title='clear filters'
        onPress={handleClearFilters}
        style={{ marginBottom: 7, backgroundColor: 'none' }}
      />
    </View>
  );
};

export default SearchTransactionContainer;
