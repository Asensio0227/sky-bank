import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../constants/styles';
import { RootState } from '../../features/auth/types';
import {
  getAllLoans,
  getAllLoansAdmin,
  hideLoading,
  openModal,
  setPage,
  showLoading,
} from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import SkeletonContainer from '../custom/Skeleton';
import ListItems from '../list/ListItems';
import ListSeparator from '../list/ListSeparator';
import PageBtnContainer from '../PageBtnContainer';
import LoanInfo from './LoanInfo';
import ViewLoans from './ViewLoans';

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
    modalVisible,
  } = useSelector((store: RootLoansState) => store.Loans);
  const { user } = useSelector((store: RootState) => store.auth);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        user.roles !== 'user'
          ? await dispatch(getAllLoansAdmin())
          : await dispatch(getAllLoans());
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

  if (data.length === 0) {
    return (
      <View style={wrappers.container}>
        <Text style={styles.text}>No transactions found!</Text>
      </View>
    );
  }

  if (isLoading) return <SkeletonContainer />;

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
              {loans.length > 1 ? 's' : ''} found
            </Text>
          ) : (
            <Text style={{ fontWeight: '700' }}>
              {userLoansTotal} loan
              {userLoans.length > 1 ? 's' : ''} found
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
            {user.roles !== 'user' ? (
              <FlatList
                data={loans}
                keyExtractor={(item) => item && item._id}
                renderItem={({ item }) => (
                  <View style={{ width: 1400 }}>
                    <ListItems
                      title={`${item.userId.firstName}, ${item.userId.lastName}`}
                      subTitle={`${item.loans.length} loan${
                        item.loans.length > 1 ? 's' : ''
                      }`}
                      image={
                        item?.userId && item.userId.avatar
                          ? { uri: item?.userId.avatar }
                          : require('../../../assets/background/user-icon.png')
                      }
                      onPress={() => {
                        dispatch(showLoading());
                        console.log('start');
                        setTimeout(() => {
                          console.log('time out');
                          dispatch(hideLoading());
                          dispatch(openModal(item) as any);
                        }, 2000);
                        console.log('end');
                      }}
                    />
                    <ListSeparator />
                    <ViewLoans />
                  </View>
                )}
                scrollEnabled
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <FlatList
                data={userLoans}
                keyExtractor={(item) => item && item._id}
                renderItem={({ item }) => <LoanInfo item={item} />}
                scrollEnabled
                showsVerticalScrollIndicator={false}
              />
            )}
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
