import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearReportFilters,
  handleReportChange,
} from '../../features/reports/reportSlice';
import { RootReportState } from '../../features/reports/types';
import { formatArray } from '../../utils/format';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';
import AppPicker from '../Picker';

export interface Option {
  label: string;
  value: string;
}

const SearchReport = () => {
  const { SortOptions, reportStatus, reportOptions, isLoading, sort, search } =
    useSelector((store: RootReportState) => store.Reports);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(search);
  const [selected, setSelected] = useState(sort);
  const [appStatus, setAppStatus] = useState(reportStatus);

  // enum
  const applicationOp = formatArray(reportOptions);
  const sortOp = formatArray(SortOptions);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleReportChange({ name: 'reportStatus', value: appStatus }));
  }, [appStatus, isLoading, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleReportChange({ name: 'search', value: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleReportChange({ name: 'sort', value: selected }));
  }, [selected]);

  const handleClearFilters = () => {
    dispatch(clearReportFilters());
    setSearchTerm('');
    setAppStatus('');
    setSelected('');
  };

  return (
    <View style={{ alignSelf: 'center', width: '90%' }}>
      <AppTextInput
        icon='account-search'
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder='Search by account number....'
      />
      <AppPicker
        label='Sort'
        items={sortOp}
        selectedValue={selected}
        onValueChange={(value) => setSelected(value)}
      />
      <AppPicker
        label='Report Status'
        items={applicationOp}
        selectedValue={appStatus}
        onValueChange={(value) => setAppStatus(value)}
      />

      <Button
        title='clear filters'
        onPress={handleClearFilters}
        style={{ marginBottom: 7, backgroundColor: 'none' }}
      />
    </View>
  );
};

export default SearchReport;
