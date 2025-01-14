import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/auth/types';
import {
  retrieveStatement,
  retrieveUserStatement,
  setPage,
} from '../../features/statement/statementSlice';
import { RootStatementState } from '../../features/statement/type';
import SkeletonContainer from '../custom/Skeleton';
import PageBtnContainer from '../PageBtnContainer';
import StatementInfo from './StatementInfo';

const StatementContainer = () => {
  const {
    isLoading,
    statement,
    userStatement,
    search,
    sort,
    totalStatement,
    numbOfPages,
    page,
  } = useSelector((store: RootStatementState) => store.Statement);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();
  const data = user.roles === 'user' ? userStatement : statement;
  const fetchStatement =
    user.roles === 'user' ? retrieveUserStatement : retrieveStatement;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(fetchStatement());
        } catch (error: any) {
          console.log('Error fetch statement', error);
        }
      })();
    }, [sort, page, numbOfPages, search])
  );

  if (isLoading) return <SkeletonContainer />;

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No statement found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '700' }}>
        {totalStatement} statement
        {data.length > 1 && 's'} found
      </Text>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginVertical: 20,
          padding: 15,
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item && item._id}
          renderItem={({ item }) => (
            <StatementInfo
              accountNumber={item.accountNumber}
              balance={item.balance}
              createdAt={item.createdAt}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              transaction={item.transaction}
              user={item.userId}
              id={item._id}
            />
          )}
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
  );
};

export default StatementContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
