import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import FormSelector from '../../components/form/FormSelector';
import SubmitButton from '../../components/form/SubmitButton';
import { palette } from '../../constants/Colors';
import { applyForLoan } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import { formatArray } from '../../utils/format';

const validateSchema = Yup.object().shape({
  employmentStatus: Yup.string().required('Please select employment status'),
  loanType: Yup.string().required('Please select loan type'),
  loanAmount: Yup.number()
    .required('Please enter loan amount')
    .min(1, 'Loan amount must be at least $1'),
  loanTerm: Yup.number()
    .required('Please enter loan term')
    .min(1, 'Loan term must be at least 1 year'),
  collateralValue: Yup.number()
    .required('Please enter interest rate')
    .min(0, 'Interest rate must be a positive number'),
  monthlyPayment: Yup.number()
    .required('Please enter monthly payment')
    .min(1, 'Monthly payment must be at least $1'),
  collateralType: Yup.string().required('Please enter total interest'),
});

const ApplyForLoan = () => {
  const { employmentStatusOptions, loanTypeOptions, isLoading } = useSelector(
    (store: RootLoansState) => store.Loans
  );
  const employmentStatusOp = formatArray(employmentStatusOptions);
  const loanTypeOp = formatArray(loanTypeOptions);
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const handleSubmit = async (data: any) => {
    try {
      await dispatch(applyForLoan(data));
      navigation.goBack();
    } catch (error: any) {
      console.log(`Error occurred: ${error} formik`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 620,
      }}
    >
      <View
        style={{
          // backgroundColor: palette.primary,
          padding: 5,
          borderRadius: 10,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
          elevation: 2,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '800',
            textTransform: 'capitalize',
            textDecorationLine: 'underline',
            color: palette.primary,
            marginVertical: 7,
            letterSpacing: 3,
          }}
        >
          Apply for loan
        </Text>
        <Form
          initialValues={{
            loanType: '',
            monthlyPayment: 0,
            loanTerm: 0,
            loanAmount: 0,
            income: 0,
            collateralType: '',
            collateralValue: 0,
            employmentStatus: '',
          }}
          validationSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          <ScrollView>
            <FormField
              name='format-list-numbered'
              names='monthlyPayment'
              placeholder='Monthly Payment'
              keyBoardType='numeric'
            />
            <FormField
              name='format-list-numbered'
              names='loanAmount'
              placeholder='Loan Amount'
              keyBoardType='numeric'
            />
            <FormField
              name='calendar-month-outline'
              names='loanTerm'
              placeholder='term in months'
              keyBoardType='numeric'
            />
            <FormField
              name='wallet'
              names='income'
              placeholder='Monthly income'
              keyBoardType='numeric'
            />
            <FormField
              name='format-list-numbered'
              names='collateralValue'
              placeholder='Collateral Value'
              keyBoardType='numeric'
            />
            <FormField
              name='warehouse'
              names='collateralType'
              placeholder='Collateral assets'
            />
            <FormSelector
              name='employmentStatus'
              items={employmentStatusOp}
              placeholder='Employment status'
            />
            <FormSelector
              name='loanType'
              items={loanTypeOp}
              placeholder='Loan type'
            />
            <SubmitButton title='submit' />
          </ScrollView>
        </Form>
      </View>
    </View>
  );
};

export default ApplyForLoan;

const styles = StyleSheet.create({});
