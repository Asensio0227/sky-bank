import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import FormSelector from '../../components/form/FormSelector';
import SubmitButton from '../../components/form/SubmitButton';
import { createAccount } from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';

export interface BankType {
  BankName: string;
  branchCode: number;
  accountNumber: number;
  accountType: string;
  ideaNumber: string;
}

const validateSchema = Yup.object().shape({
  BankName: Yup.string().required('Bank name is required'),
  branchCode: Yup.number().required('Branch code is required'),
  accountNumber: Yup.number().required('Account number is required'),
  accountType: Yup.string().required('Account type is required'),
  ideaNumber: Yup.string().required('Idea number is required'),
});

const CreateAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (store: RootAccountState) => store.allAccounts
  );
  const items = [
    { label: 'Savings', value: 'savings' },
    { label: 'Checking', value: 'checking' },
    { label: ' Loan', value: 'loan' },
    { label: ' Business', value: 'business' },
  ];

  const handleSubmit = async (data: BankType) => {
    try {
      await dispatch(createAccount(data) as any);
      navigation.navigate('AdminHome');
    } catch (error: any) {
      console.log('Error while creating account', error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        initialValues={{
          BankName: 'Sky Bank',
          branchCode: 0,
          accountNumber: 0,
          accountType: '',
          ideaNumber: '',
        }}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <ScrollView>
          <FormField name='bank' names='bankName' placeholder='Bank Name' />
          <FormField
            name='barcode'
            names='branchCode'
            placeholder='Branch code'
            keyBoardType='numeric'
          />
          <FormField
            name='format-list-numbered-rtl'
            names='ideaNumber'
            placeholder='ID Number'
          />
          <FormSelector
            name='accountType'
            items={items}
            placeholder='Account type'
          />
          <FormField
            name='format-list-numbered'
            names='accountNumber'
            placeholder='Account number'
            keyBoardType='numeric'
          />
          <SubmitButton title='create account' />
        </ScrollView>
      </Form>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
