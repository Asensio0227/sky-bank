import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  SearchTransactionContainer,
  TransactionsContainer,
} from '../../components/transaction';

const Transaction = () => {
  const route: any = useRoute();

  return (
    <ScrollView style={styles.container}>
      <SearchTransactionContainer />
      <TransactionsContainer params={route.params} />
    </ScrollView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
