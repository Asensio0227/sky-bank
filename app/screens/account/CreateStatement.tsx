import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import DatePicker from '../../components/form/DatePicker';
import Form from '../../components/form/Form';
import SubmitButton from '../../components/form/SubmitButton';
import { palette } from '../../constants/Colors';
import { createStatement } from '../../features/statement/statementSlice';
import { RootStatementState } from '../../features/statement/type';
import useLocation from '../../hooks/useLocation';

const validateSchema = Yup.object().shape({
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date().required('End date is required').nullable(),
});

const CreateStatement = () => {
  const { location, errorMsg } = useLocation();
  const dispatch: any = useDispatch();
  const route: any = useRoute();
  const params = route.params;
  const accountNumber = params && params.accountNumber;
  const navigation: any = useNavigation();
  const { isLoading } = useSelector(
    (store: RootStatementState) => store.Statement
  );

  const handleSubmit = async (data: any) => {
    if (location && accountNumber) {
      try {
        const info: any = { ...data, accountNumber, location };
        const result = await dispatch(createStatement(info));
        const payload = result && result.payload && result.payload.state;
        navigation.navigate('pdf', payload);
      } catch (error: any) {
        console.log('Error while submitting ', error);
      }
    } else {
      alert(errorMsg || 'Network Error! Please try again later.');
    }
  };

  if (isLoading) return <SkeletonContainer />;

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
          create Statement
        </Text>
        <Form
          initialValues={{
            startDate: '',
            endDate: '',
          }}
          validationSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          <Text style={{ fontSize: 14 }}>Start Date : </Text>
          <DatePicker
            name='startDate'
            placeholder='Date from....'
            autoCapitalize='none'
            style={{ width: 200 }}
          />
          <Text>End Date : </Text>
          <DatePicker
            name='endDate'
            placeholder='Date upto.....'
            autoCapitalize='none'
            style={{ width: 200 }}
          />
          <SubmitButton title='submit' />
        </Form>
      </View>
    </View>
  );
};

export default CreateStatement;
