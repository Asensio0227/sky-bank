import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LoanContainer from '../../components/loans/LoanContainer';
import SearchLoanContainer from '../../components/loans/SearchLoanContainer';

const Loans = () => {
  return (
    <ScrollView>
      <SearchLoanContainer />
      <LoanContainer />
    </ScrollView>
  );
};

export default Loans;

const styles = StyleSheet.create({});
