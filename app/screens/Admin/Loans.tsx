import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoanContainer from '../../components/loans/LoanContainer';
import SearchLoanContainer from '../../components/loans/SearchLoanContainer';
import ProtectedScreen from '../ProtectedScreen';

const Loans = () => {
  return (
    <ProtectedScreen>
      <ScrollView style={{ flex: 1 }}>
        <SearchLoanContainer />
        <LoanContainer />
      </ScrollView>
    </ProtectedScreen>
  );
};

export default Loans;

const styles = StyleSheet.create({});
