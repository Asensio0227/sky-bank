import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../../components/custom/Loading';
import DatePicker from '../../../components/form/DatePicker';
import Form from '../../../components/form/Form';
import FormField from '../../../components/form/FormField';
import SubmitButton from '../../../components/form/SubmitButton';
import { palette } from '../../../constants/Colors';
import {
  createAudit,
  hideLoading,
} from '../../../features/reports/reportSlice';
import { RootReportState } from '../../../features/reports/types';

const CreateReport = () => {
  const route = useRoute();
  const user: any = route.params;
  const { isLoading } = useSelector((store: RootReportState) => store.Reports);
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const handleSubmit = async (item: any) => {
    try {
      const accountId = user._id;
      const userId = user.userId._id;
      const data = { accountId, userId, ...item };
      const resp = await dispatch(createAudit(data));
      navigation.navigate('single-report', resp.payload.report);
    } catch (error: any) {
      console.log(error.payload || 'Error occurred!');
    }
  };

  useEffect(() => {
    dispatch(hideLoading());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          startDate: '',
          endDate: '',
          desc: '',
        }}
        validationSchema={Yup.object().shape({
          startDate: Yup.string().required('Start date is required'),
          endDate: Yup.string().required('End date is required'),
          desc: Yup.string().required('Description is required'),
        })}
        onSubmit={handleSubmit}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Create Report</Text>
          <FormField
            name='card-text'
            names='desc'
            placeholder='Reason for audit'
          />
          <DatePicker
            style={styles.input}
            name='startDate'
            placeholder='Start of account audit'
          />
          <DatePicker
            style={styles.input}
            name='endDate'
            placeholder='end of account audit'
          />
          <SubmitButton title='submit' />
        </View>
      </Form>
    </View>
  );
};

export default CreateReport;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  form: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: palette.white,
    borderRadius: 10,
    width: '90%',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.primary,
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    textDecorationLine: 'underline',
  },
});
