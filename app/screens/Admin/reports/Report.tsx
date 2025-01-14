import React from 'react';
import { ScrollView } from 'react-native';
import ReportContainer from '../../../components/reports/ReportContainer';
import SearchReport from '../../../components/reports/SearchReport';
import ProtectedScreen from '../../ProtectedScreen';

const Report = () => {
  return (
    <ProtectedScreen>
      <ScrollView style={{ flex: 1 }}>
        <SearchReport />
        <ReportContainer />
      </ScrollView>
    </ProtectedScreen>
  );
};

export default Report;
