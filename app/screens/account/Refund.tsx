import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonContainer from '../../components/custom/Skeleton';
import ListSeparator from '../../components/list/ListSeparator';
import ViewTransaction from '../../components/transaction/ViewTransaction';
import { palette } from '../../constants/Colors';
import {
  refundable,
  requestRefunds,
} from '../../features/transaction/transactionSlice';
import {
  RootTransactionState,
  transactionType,
} from '../../features/transaction/types';

const Refund = () => {
  const dispatch: any = useDispatch();
  const { refunds, isLoading } = useSelector(
    (store: RootTransactionState) => store.AllTransactions
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(refundable());
    }, [])
  );

  if (isLoading) return <SkeletonContainer />;

  if (refunds.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          No refundable transaction done in last 30 minutes found!
        </Text>
      </View>
    );
  }

  const handleRefund = (item: { item: transactionType }) => {
    Alert.alert('Confirm Change', 'Are you sure you want to request refunds?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const id = item._id;
          dispatch(requestRefunds(id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refundable Transactions</Text>
      <FlatList
        data={refunds}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <ViewTransaction
              title={item?.description}
              subTitle={`$${item?.amount / 100}`}
              image={
                item?.userId && item.userId.avatar
                  ? { uri: item?.userId.avatar }
                  : require('../../../assets/background/user-icon.png')
              }
              description={item?.description}
              type={item?.type}
              accountType={item?.accountType}
              reference={item?.reference}
              accountNumber={item?.accountNumber}
              accountToNumber={item?.toAccountNumber}
              branchCode={item?.branchCode}
              location={item?.location}
              status={item?.status}
              transactionCharges={`$${item?.transactionCharges / 100}`}
              transactionType={item?.transactionType}
              transactionDate={item?.createdAt}
              isReversed={item?.isReversed}
              reversal={item.reversalStatus}
              onPress={() => handleRefund(item)}
            />
            <ListSeparator />
          </View>
        )}
      />
    </View>
  );
};

export default Refund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    width: 300,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 20,
    color: palette.primaryDark,
    textDecorationLine: 'underline',
  },
});
