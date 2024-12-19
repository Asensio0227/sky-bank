import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../../components/custom/Loading';
import Form from '../../../components/form/Form';
import FormField from '../../../components/form/FormField';
import FormSelector from '../../../components/form/FormSelector';
import SubmitButton from '../../../components/form/SubmitButton';
import { updateAudit } from '../../../features/reports/reportSlice';
import { RootReportState } from '../../../features/reports/types';
import { formatArray } from '../../../utils/format';

const EditReport = () => {
  const { reportOptions, isLoading } = useSelector(
    (store: RootReportState) => store.Reports
  );
  const reportOp: any = formatArray(reportOptions);
  const route: any = useRoute();
  const id = route.params._id;
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();

  const handleSubmit = async (item: any) => {
    try {
      const data = { id, ...item };
      await dispatch(updateAudit(data));
    } catch (error: any) {
      console.log(error || 'Error occurred when submitting');
    } finally {
      navigation.navigate('report');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ reportStatus: '', desc: '' }}
        validationSchema={Yup.object().shape({
          reportStatus: Yup.string().required('End date is required'),
          desc: Yup.string().required('Description is required'),
        })}
        onSubmit={handleSubmit}
      >
        <FormSelector
          name='reportStatus'
          placeholder='Report Status'
          items={reportOp}
        />
        <FormField
          name='card-text'
          names='desc'
          placeholder='Reason for audit'
        />
        <SubmitButton title='update status' />
      </Form>
    </View>
  );
};

export default EditReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
