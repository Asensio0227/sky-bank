import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import DatePicker from '../../components/form/DatePicker';
import Form, { userType } from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import PhoneNumberInput from '../../components/form/PhoneNumberInput';
import SubmitButton from '../../components/form/SubmitButton';
import { createUserAccount } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your name'),
  lastName: Yup.string().required('Please enter your surname'),
  gender: Yup.string().required('Please enter your gender'),
  email: Yup.string().email().required('Please enter your email'),
  ideaNumber: Yup.string().required('Please enter your iD Number'),
  physicalAddress: Yup.string().required('Please enter your physical address'),
  dob: Yup.date().required('Date of birth is required').nullable(),
  phoneNumber: Yup.string()
    .matches(
      /(?:(?<internationCode>\+[1-9]{1,4})[ -])?\(?(?<areacode>\d{2,3})\)?[ -]?(\d{3})[ -]?(\d{4})/,
      'Invalid phone number'
    )
    .required('Phone number is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password is too short - should be 6 chars minimum'),
});

const Register = () => {
  const navigation: any = useNavigation();
  const { isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  const onSubmit = async (props: userType) => {
    await dispatch(createUserAccount(props) as any);
    navigation.navigate('verify');
  };

  if (isLoading) {
    return <SkeletonContainer />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Form
          initialValues={{
            firstName: '',
            lastName: '',
            ideaNumber: '',
            email: '',
            physicalAddress: '',
            password: '',
            phoneNumber: '',
            dob: '',
            gender: '',
          }}
          validationSchema={validateSchema}
          onSubmit={onSubmit}
        >
          <FormField name='account' names='firstName' placeholder='Name' />
          <FormField name='account' names='lastName' placeholder='surname' />
          <FormField
            name='format-list-numbered-rtl'
            names='ideaNumber'
            placeholder='ID Number'
          />
          <FormField name='email' names='email' placeholder='Email' />
          <FormField
            name='home'
            names='physicalAddress'
            placeholder='Physical Address'
          />
          <DatePicker
            name='dob'
            placeholder='Your date of birth'
            autoCapitalize='none'
          />
          <FormField
            name='human-female-boy'
            names='gender'
            placeholder='Gender'
          />
          <PhoneNumberInput name='phoneNumber' />
          <FormField
            name='lock'
            names='password'
            keyBoardType='email-address'
            textContent='password'
            autoCorrect={false}
            secureTextEntry={true}
            placeholder='Password'
          />
          <SubmitButton title='sign up' />
        </Form>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    flex: 1,
    justifyContent: 'center',
  },
  form: {},
});

export default Register;
