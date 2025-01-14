import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import { calculateLoanMonthlyPayments } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import ProtectedScreen from '../ProtectedScreen';

const CalculatePayments = () => {
  const { isLoading } = useSelector((store: RootLoansState) => store.Loans);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const id = route.params._id;
  const { loanAmount, loanTerm, interestRate } = route.params;
  const numericAmount = Number(loanAmount / 100).toFixed(2);
  const dispatch: any = useDispatch();

  const handleSubmit = async (dataInfo: {
    interestRate: any;
    loanAmount: any;
    loanTerm: any;
  }) => {
    try {
      const data = { ...dataInfo, id };
      const resp = await dispatch(calculateLoanMonthlyPayments(data));
      Alert.alert(
        'Loan ',
        `Monthly payment : $${resp.payload.monthlyPayment}`,
        [{ text: 'OK', onPress: () => navigation.navigate('approve', id) }]
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading) return <SkeletonContainer />;

  return (
    <ProtectedScreen>
      <View style={styles.container}>
        <Form
          initialValues={{
            loanAmount: numericAmount || '',
            loanTerm: loanTerm.toString() || '',
            interestRate: interestRate.toString() || '',
          }}
          validationSchema={Yup.object().shape({
            loanAmount: Yup.string().required('Loan amount is required'),
            loanTerm: Yup.string().required('Loan term is required'),
            interestRate: Yup.string().required('Interest rate is required'),
          })}
          onSubmit={handleSubmit}
        >
          <FormField
            name='format-list-numbered'
            names='loanAmount'
            placeholder='loan amount'
            keyBoardType='numeric'
          />
          <FormField
            name='update'
            names='loanTerm'
            placeholder='loan term in months'
            keyBoardType='numeric'
          />
          <FormField
            name='billiards-rack'
            names='interestRate'
            placeholder='Interest rate%'
            keyBoardType='numeric'
          />
          <SubmitButton title='submit' />
        </Form>
      </View>
    </ProtectedScreen>
  );
};

export default CalculatePayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
