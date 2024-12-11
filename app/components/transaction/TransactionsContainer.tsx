import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../constants/styles';
import { accType } from '../../features/accounts/types';
import { RootState } from '../../features/auth/types';
import {
  handlePage,
  retrieveAllTransactions,
  retrieveTransactions,
} from '../../features/transaction/transactionSlice';
import { RootTransactionState } from '../../features/transaction/types';
import Loading from '../custom/Loading';
import ListSeparator from '../list/ListSeparator';
import PageBtnContainer from '../PageBtnContainer';
import ViewTransaction from './ViewTransaction';

const TransactionsContainer: React.FC<{ params: accType }> = ({ params }) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const accountNumber = user?.roles === 'user' && params.accountNumber;
  const {
    page,
    sort,
    status,
    type,
    userTransactions,
    userTransactionsTotal,
    transactionType,
    accountType,
    isLoading,
    numbOfPages,
    transactions,
    search,
    totalTransactions,
  } = useSelector((store: RootTransactionState) => store.AllTransactions);
  const dispatch = useDispatch();
  const transaction =
    userTransactions &&
    userTransactions.flatMap((user: any) => user.transactions);
  const allTransaction = transactions.flatMap(
    (trans: any) => trans.transactions
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          user?.roles !== 'user'
            ? await dispatch(retrieveTransactions() as any)
            : await dispatch(retrieveAllTransactions(accountNumber) as any);
        } catch (error: any) {
          console.log('Error container', error);
        }
      })();
    }, [
      accountNumber,
      page,
      sort,
      status,
      type,
      transactionType,
      accountType,
      search,
    ])
  );

  const data = user.roles !== 'user' ? transactions : userTransactions;

  if (data.length === 0) {
    return (
      <View style={wrappers.container}>
        <Text style={styles.text}>No transactions found!</Text>
      </View>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <View style={{ flex: 1, overflow: 'scroll' }}>
        <View
          style={{
            flex: 1,
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {user.roles === 'user' ? (
            <Text style={{ fontWeight: '700' }}>
              {userTransactionsTotal} transaction
              {transaction.length > 1 && 's'} found
            </Text>
          ) : (
            <Text style={{ fontWeight: '700' }}>
              {totalTransactions} transaction
              {transactions.length > 1 && 's'} found
            </Text>
          )}
          <View
            style={{
              flex: 1,
              width: '90%',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              marginVertical: 20,
              padding: 15,
            }}
          >
            <FlatList
              data={user.roles === 'user' ? transaction : allTransaction}
              keyExtractor={(item, index) =>
                (item && item._id) || index.toString()
              }
              renderItem={({ item }) => (
                <View style={{ width: 1400 }}>
                  <ViewTransaction
                    title={item?.description}
                    subTitle={`$${item?.amount / 100}`}
                    image={
                      item?.userId && item.userId.avatar
                        ? { uri: item?.userId.avatar }
                        : require('../../../assets/background/user-icon.png')
                    }
                    onPress={() => {
                      // dispatch(openModal(item) as any);
                    }}
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
                  />
                  <ListSeparator />
                  {/* <ViewModal /> */}
                </View>
              )}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          </View>
          {numbOfPages > 1 && (
            <PageBtnContainer
              page={page}
              numbOfPages={numbOfPages}
              handlePress={handlePage}
            />
          )}
        </View>
      </View>
    </>
  );
};

const wrappers = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionsContainer;
