import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import Title from '../../components/Title';
import { wrapper } from '../../constants/styles';
import {
  getSingleAcc,
  updateUserAcc,
} from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';

const Management = () => {
  const { isLoading, singleAccount } = useSelector(
    (store: RootAccountState) => store.allAccounts
  );
  const dispatch = useDispatch();
  const route: any = useRoute();
  const { _id } = route.params;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(getSingleAcc(_id) as any);
        } catch (error: any) {
          console.log('Error fetching management', error);
        }
      })();
    }, [_id, dispatch])
  );

  if (isLoading) return <SkeletonContainer />;

  if (!singleAccount)
    return (
      <View style={styles.container}>
        <Text>No account found.</Text>
      </View>
    );

  const {
    accountHolderName,
    accountNumber,
    accountType,
    balance,
    branchCode,
    overdraftLimit,
  } = singleAccount;
  const limit = (overdraftLimit / 100).toFixed(2);

  const handleSubmit = async (data: any) => {
    try {
      const dataInfo = { ...data, _id };
      await dispatch(updateUserAcc(dataInfo) as any);
    } catch (error: any) {
      console.log('Error when submitting', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[wrapper.title, { marginVertical: 10 }]}>
        Account Details:
      </Text>
      <View style={styles.content}>
        <Form
          initialValues={{
            overdraftLimit: '$' + limit.toString() || '1000',
          }}
          validationSchema={Yup.object().shape({
            overdraftLimit: Yup.number()
              .min(1000, 'Minimum transfer limit is $1000')
              .max(10000000, 'Maximum transfer limit is $100,000')
              .required('transfer limit is required'),
          })}
          onSubmit={handleSubmit}
        >
          <View style={wrapper.between}>
            <Title title={accountHolderName} style={{ fontSize: 50 }} />
            <View>
              <Text>Balance: ${balance.toFixed(2)}</Text>
              <Text>Branch Code: {branchCode}</Text>
            </View>
          </View>
          <View style={{ marginTop: 6 }}>
            <View style={[wrapper.between, { marginVertical: 7 }]}>
              <Text>Account Holder: </Text>
              <Text>{accountHolderName}</Text>
            </View>
            <View style={[wrapper.between, { marginVertical: 7 }]}>
              <Text>Account Number: </Text>
              <Text>{accountNumber}</Text>
            </View>
            <View style={[wrapper.between, { marginVertical: 7 }]}>
              <Text>Account Type: </Text>
              <Text> {accountType}</Text>
            </View>
            <View style={[wrapper.between, { marginVertical: 7 }]}>
              <Text>Transfer limit: </Text>
              <Text> ${limit}</Text>
            </View>
            <Text style={wrapper.title}>Transfer limit :</Text>
            <FormField names='overdraftLimit' />
          </View>
          <SubmitButton title='update transfer limit' />
        </Form>
      </View>
    </View>
  );
};

export default Management;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 700,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
