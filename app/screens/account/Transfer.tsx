import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import FormSelector from '../../components/form/FormSelector';
import SubmitButton from '../../components/form/SubmitButton';
import { palette } from '../../constants/Colors';
import { styles, wrapper } from '../../constants/styles';
import { transferMoney } from '../../features/transaction/transactionSlice';
import { RootTransactionState } from '../../features/transaction/types';
import useLocation from '../../hooks/useLocation';
import { formatArray, formatValue } from '../../utils/format';

const Transfer = () => {
  const { location } = useLocation();
  const route: any = useRoute();
  const acc = route.params;
  const navigation: any = useNavigation();
  const { transactionOption, isLoading } = useSelector(
    (store: RootTransactionState) => store.AllTransactions
  );
  const items = formatArray(transactionOption);
  const dispatch = useDispatch();
  const monthlyPayment = acc.loanAmount && formatValue(acc.monthlyPayment);

  const handleSubmit = async (data: any) => {
    try {
      const accInfo = { ...data, location };
      await dispatch(transferMoney({ data: accInfo, id: acc._id }) as any);
      navigation.goBack();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handlePayment = async (data: any) => {
    console.log(data);

    // try {
    //   const accInfo = { ...data, location, id: acc._id };
    //   await dispatch(loanPayment(accInfo) as any);
    //   navigation.goBack();
    // } catch (error: any) {
    //   console.log(error.message);
    // }
  };

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      {acc.loanAmount ? (
        <Form
          initialValues={{
            amount: monthlyPayment,
            reference: acc.name,
            transactionType: 'loan',
          }}
          validationSchema={Yup.object().shape({
            reference: Yup.string().required('Reference is required'),
            amount: Yup.number().required('Amount is required'),
            transactionType: Yup.string().required(
              'Transaction type is required'
            ),
          })}
          onSubmit={handlePayment}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: palette.white,
                boxShadow: '10px 15px 10px 15px rgba(0,0,0,0.5)',
                width: '90%',
                borderRadius: 15,
                marginVertical: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={wrapper.title}>Your Account</Text>
              <Text style={styles.text}>{acc.name}</Text>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>Current balance</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: palette.primary,
                  }}
                >
                  ${monthlyPayment}
                </Text>
              </View>

              <SubmitButton title='Pay Now' />
            </View>
          </ScrollView>
        </Form>
      ) : (
        <Form
          initialValues={{
            bank: '',
            reference: '',
            branchCode: acc.branchCode,
            transactionType: '',
            toAccountNumber: '',
            amount: '',
            description: '',
          }}
          validationSchema={Yup.object().shape({
            bank: Yup.string().required('Bank name is required'),
            reference: Yup.string().required('Reference is required'),
            branchCode: Yup.number().required('Branch code is required'),
            transactionType: Yup.string().required(
              'Transaction type is required'
            ),
            toAccountNumber: Yup.number().required(
              'Account number is required'
            ),
            amount: Yup.number().required('Amount is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={handleSubmit}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormField name='bank' names='bank' placeholder='Bank Name' />
            <FormField
              name='account'
              names='reference'
              placeholder='Reference'
            />

            <FormSelector
              name='transactionType'
              items={items}
              placeholder='Transaction type'
            />
            <FormField
              name='bank-transfer'
              names='toAccountNumber'
              placeholder='Account number'
              keyBoardType='numeric'
            />
            <FormField
              name='format-list-numbered'
              names='amount'
              placeholder='Amount'
              keyBoardType='numeric'
            />
            <FormField
              name='card-text'
              names='description'
              placeholder='Description'
            />
            <SubmitButton title='submit' />
          </ScrollView>
        </Form>
      )}
    </View>
  );
};

export default Transfer;
