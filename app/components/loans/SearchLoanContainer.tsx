import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/auth/types';
import { clearFilter, handleChange } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import { formatArray } from '../../utils/format';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';
import AppPicker from '../Picker';

export interface Option {
  label: string;
  value: string;
}

const SearchLoanContainer = () => {
  const {
    employmentStatusOptions,
    loanTypeOptions,
    applicationStatusOptions,
    statusOptions,
    sortOptions,
    isLoading,
    sort,
    search,
    status,
    applicationStatus,
    loanType,
    employmentStatus,
  } = useSelector((store: RootLoansState) => store.Loans);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedLanguage, setSelectedLanguage] = useState(status);
  const [selected, setSelected] = useState(sort);
  const [appStatus, setAppStatus] = useState(applicationStatus);
  const [loanTypeStatus, setLoanTypStatus] = useState(loanType);
  const [empStatus, setEmpStatus] = useState(employmentStatus);
  const { user } = useSelector((store: RootState) => store.auth);

  // enum
  const employmentStatusOp = formatArray(employmentStatusOptions);
  const loanTypeOp = formatArray(loanTypeOptions);
  const applicationOp = formatArray(applicationStatusOptions);
  const statusOp = formatArray(statusOptions);
  const sortOp = formatArray(sortOptions);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'employStatus', value: empStatus }));
  }, [empStatus, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'applicationStatus', value: appStatus }));
  }, [appStatus, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'loanType', value: loanTypeStatus }));
  }, [loanTypeStatus, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleChange({ name: 'status', value: selectedLanguage }));
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
    dispatch(clearFilter());
    setSelectedLanguage('');
    setSearchTerm('');
    setSelected('');
    setAppStatus('');
    setEmpStatus('');
    setLoanTypStatus('');
  };

  return (
    <View style={{ alignSelf: 'center', width: '90%' }}>
      {user.roles !== 'user' && (
        <AppTextInput
          icon='account-search'
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          placeholder='Search....'
        />
      )}
      <AppPicker
        label='Status'
        items={statusOp}
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
        label='Application Status'
        items={applicationOp}
        selectedValue={appStatus}
        onValueChange={(value) => setAppStatus(value)}
      />
      <AppPicker
        label='Loan Type'
        items={loanTypeOp}
        selectedValue={loanTypeStatus}
        onValueChange={(value) => setLoanTypStatus(value)}
      />
      {user.roles !== 'user' && (
        <AppPicker
          label='Employment Status'
          items={employmentStatusOp}
          selectedValue={empStatus}
          onValueChange={(value) => setEmpStatus(value)}
        />
      )}
      <Button
        title='clear filters'
        onPress={handleClearFilters}
        style={{ marginBottom: 7, backgroundColor: 'none' }}
      />
    </View>
  );
};

export default SearchLoanContainer;
