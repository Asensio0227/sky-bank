import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonContainer from '../../components/custom/Skeleton';
import StatementInfo from '../../components/statement/StatementInfo';
import { palette } from '../../constants/Colors';
import { styles } from '../../constants/styles';
import { retrieveSingleStatement } from '../../features/statement/statementSlice';
import { RootStatementState } from '../../features/statement/type';

const StatementPdf = () => {
  const { isLoading, singleStatement } = useSelector(
    (store: RootStatementState) => store.Statement
  );
  const route: any = useRoute();
  const params: any = route.params;
  const id: string = params && params._id;
  const dispatch: any = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(retrieveSingleStatement(id));
        } catch (error: any) {
          console.log('Error retrieving single statement', error);
        }
      })();
    }, [id])
  );

  if (isLoading) return <SkeletonContainer />;

  if (!singleStatement) {
    return (
      <View style={styles.centerView}>
        <Text>No statement found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {singleStatement && (
        <StatementInfo
          accountNumber={singleStatement.accountNumber}
          balance={singleStatement.balance}
          createdAt={singleStatement.createdAt}
          location={singleStatement.location}
          startDate={singleStatement.startDate}
          endDate={singleStatement.endDate}
          transaction={singleStatement.transaction}
          user={singleStatement.userId}
          id={singleStatement._id}
        />
      )}
    </ScrollView>
  );
};

export default StatementPdf;

const wrappers = StyleSheet.create({
  mainIcon: {
    backgroundColor: palette.primaryDark,
    padding: 5,
    borderRadius: 5,
    left: 5,
    position: 'absolute',
    top: 5,
  },
  text: {
    color: palette.white,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: palette.white,
    fontSize: 13,
    marginBottom: 2,
  },
  between: {
    position: 'relative',
  },
});
