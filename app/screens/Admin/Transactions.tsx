import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  SearchTransactionContainer,
  TransactionsContainer,
} from '../../components/transaction';
import ProtectedScreen from '../ProtectedScreen';

const Transactions = () => {
  const route: any = useRoute();

  return (
    <ProtectedScreen>
      <ScrollView style={styles.container}>
        <SearchTransactionContainer />
        <TransactionsContainer params={route.params} />
      </ScrollView>
    </ProtectedScreen>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
