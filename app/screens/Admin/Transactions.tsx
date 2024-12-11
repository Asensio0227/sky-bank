import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  SearchTransactionContainer,
  TransactionsContainer,
} from '../../components/transaction';

const Transactions = () => {
  const route: any = useRoute();
  console.log(`===route===`);
  console.log(route);
  console.log(`===route===`);

  return (
    <ScrollView style={styles.container}>
      <SearchTransactionContainer />
      <TransactionsContainer params={route.params} />
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
