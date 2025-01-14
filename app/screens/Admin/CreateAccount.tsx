import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import FormSelector from '../../components/form/FormSelector';
import SubmitButton from '../../components/form/SubmitButton';
import {
  createAccount,
  editAccount,
} from '../../features/accounts/accountsSlice';
import { accType, RootAccountState } from '../../features/accounts/types';
import ProtectedScreen from '../ProtectedScreen';

export interface BankType {
  BankName: string;
  branchCode: number;
  accountNumber: number;
  accountType: string;
  ideaNumber: string;
}

const validateSchema = Yup.object().shape({
  BanKName: Yup.string().required('Bank name is required'),
  branchCode: Yup.number().required('Branch code is required'),
  accountNumber: Yup.number().required('Account number is required'),
  accountType: Yup.string().required('Account type is required'),
  ideaNumber: Yup.string().required('Idea number is required'),
});

const validateEditSchema = Yup.object().shape({
  branchCode: Yup.number().required('Branch code is required'),
  accountNumber: Yup.number().required('Account number is required'),
  accountType: Yup.string().required('Account type is required'),
});

const CreateAccount = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const accInfo: any | accType = route.params;
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

  const handleEditSubmit = async (data: accType) => {
    try {
      const id = accInfo._id;
      const dataInfo: any = {
        ...data,
        id,
      };
      await dispatch(editAccount(dataInfo) as any);
      navigation.goBack();
    } catch (error: any) {
      console.log('Error while editing account', error);
    }
  };

  if (isLoading) return <SkeletonContainer />;

  const branchCode = accInfo?.branchCode.toString();
  const accountNumber = accInfo?.accountNumber.toString();

  return (
    <ProtectedScreen>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {accInfo ? (
          <Form
            initialValues={{
              branchCode: branchCode,
              accountNumber: accountNumber,
              accountType: accInfo.accountType,
            }}
            validationSchema={validateEditSchema}
            onSubmit={handleEditSubmit}
          >
            <View
              style={{
                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  textTransform: 'capitalize',
                }}
              >
                edit account
              </Text>
            </View>
            <ScrollView>
              <FormField
                name='barcode'
                names='branchCode'
                placeholder='Branch code'
                keyBoardType='numeric'
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
              <SubmitButton title='submit' />
            </ScrollView>
          </Form>
        ) : (
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
            <View
              style={{
                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  textTransform: 'capitalize',
                }}
              >
                create account
              </Text>
            </View>
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
        )}
      </View>
    </ProtectedScreen>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
