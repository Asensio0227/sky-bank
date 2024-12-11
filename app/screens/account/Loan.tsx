import React from 'react';
import { ScrollView } from 'react-native';
import LoanContainer from '../../components/loans/LoanContainer';
import SearchLoanContainer from '../../components/loans/SearchLoanContainer';

const Loan = () => {
  return (
    <ScrollView>
      <SearchLoanContainer />
      <LoanContainer />
    </ScrollView>
  );
};

export default Loan;
