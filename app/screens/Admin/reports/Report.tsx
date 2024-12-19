import React from 'react';
import { ScrollView } from 'react-native';
import ReportContainer from '../../../components/reports/ReportContainer';
import SearchReport from '../../../components/reports/SearchReport';

const Report = () => {
  return (
    <ScrollView>
      <SearchReport />
      <ReportContainer />
    </ScrollView>
  );
};

export default Report;
