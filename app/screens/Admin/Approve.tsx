import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import DatePicker from '../../components/form/DatePicker';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import { approveLoanApplication } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import { formatDate } from '../../utils/format';

const Approve = () => {
  const { monthlyPayment, isLoading } = useSelector(
    (store: RootLoansState) => store.Loans
  );
  const route: any = useRoute();
  const id = route.params;
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const handleSubmit = async (item: any) => {
    try {
      const data = { ...item, id };
      await dispatch(approveLoanApplication(data));
    } catch (error: any) {
      console.log(error.payload.msg);
    } finally {
      navigation.navigate('loans');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          monthlyPayment: monthlyPayment.toString() || '',
          startDate: formatDate(new Date()) || '',
          endDate: '',
        }}
        validationSchema={Yup.object().shape({
          monthlyPayment: Yup.string().required('Monthly payment is required'),
          startDate: Yup.string().required('Start date is required'),
          endDate: Yup.string().required('End date is required'),
        })}
        onSubmit={handleSubmit}
      >
        <FormField
          name='format-list-numbered'
          names='monthlyPayment'
          placeholder='Monthly payment'
          keyBoardType='numeric'
        />
        <DatePicker name='startDate' placeholder='Start of loan payment' />
        <DatePicker name='endDate' placeholder='end of loan payment' />
        <SubmitButton title='submit' />
      </Form>
    </View>
  );
};

export default Approve;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
