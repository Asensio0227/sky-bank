import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StatementContainer from '../../components/statement/StatementContainer';
import StatementFilter from '../../components/statement/StatementFilter';

const Statement = () => {
  return (
    <ScrollView style={styles.container}>
      <StatementFilter />
      <StatementContainer />
    </ScrollView>
  );
};

export default Statement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
