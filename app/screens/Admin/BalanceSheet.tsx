import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StatementContainer from '../../components/statement/StatementContainer';
import StatementFilter from '../../components/statement/StatementFilter';
import ProtectedScreen from '../ProtectedScreen';

const BalanceSheet = () => {
  return (
    <ProtectedScreen>
      <ScrollView style={styles.container}>
        <StatementFilter />
        <StatementContainer />
      </ScrollView>
    </ProtectedScreen>
  );
};

export default BalanceSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
