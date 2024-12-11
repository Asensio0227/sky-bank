import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../constants/styles';
import { RootState } from '../../features/auth/types';
import { getAllLoans, setPage } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import Loading from '../custom/Loading';
import PageBtnContainer from '../PageBtnContainer';
import LoanInfo from './LoanInfo';

const LoanContainer = () => {
  const dispatch: any = useDispatch();
  const {
    userLoans,
    userLoansTotal,
    totalLoans,
    loans,
    page,
    numbOfPages,
    isLoading,
    sort,
    search,
    status,
    applicationStatus,
    loanType,
    employmentStatus,
  } = useSelector((store: RootLoansState) => store.Loans);
  const { user } = useSelector((store: RootState) => store.auth);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(getAllLoans());
      })();
    }, [
      page,
      sort,
      sort,
      search,
      status,
      applicationStatus,
      loanType,
      employmentStatus,
      search,
    ])
  );

  const data = user.roles !== 'user' ? loans : userLoans;

  console.log(data.length);
  console.log(`======data==`);
  console.log(userLoans.length);

  if (data.length === 0) {
    return (
      <View style={wrappers.container}>
        <Text style={styles.text}>No transactions found!</Text>
      </View>
    );
  }

  if (isLoading) return <Loading />;

  console.log(loans);
  console.log(`====loans===`);
  console.log(`====loans===`);

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
          {user.roles !== 'user' ? (
            <Text style={{ fontWeight: '700' }}>
              {totalLoans} loan
              {loans.length > 1 && 's'} found
            </Text>
          ) : (
            <Text style={{ fontWeight: '700' }}>
              {userLoansTotal} loan
              {userLoans.length > 1 && 's'} found
            </Text>
          )}
          <View
            style={{
              // flex: 1,
              width: '90%',
              maxWidth: 350,
              flexWrap: 'nowrap',
              justifyContent: 'center',
              marginVertical: 20,
              padding: 15,
            }}
          >
            <FlatList
              data={userLoans}
              keyExtractor={(item, index) =>
                (item && item._id) || index.toString()
              }
              renderItem={({ item }) => <LoanInfo item={item} />}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          </View>
          {numbOfPages > 1 && (
            <PageBtnContainer
              page={page}
              numbOfPages={numbOfPages}
              handlePress={setPage}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default LoanContainer;

const wrappers = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {},
});
