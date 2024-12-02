import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import TextLink from '../../components/custom/TextLink';
import Form, { userType } from '../../components/form/Form';
import ResetField from '../../components/form/ResetField';
import SubmitButton from '../../components/form/SubmitButton';
import { Colors } from '../../constants/Colors';
import { forgotPassword, resetPassword } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';

const PwReset = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store: RootState) => store.auth);

  const onRequestReset = async (data: userType) => {
    try {
      await dispatch(forgotPassword(data) as any);
      setSuccessfulCreation(true);
    } catch (error: any) {
      console.log(error.msg);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async (data: userType) => {
    try {
      await dispatch(resetPassword(data) as any);
      setSuccessfulCreation(false);
      navigation.navigate('login');
    } catch (error: any) {
      console.log(error.msg);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      {!successfulCreation && (
        <Form
          initialValues={{ email: '' }}
          onSubmit={onRequestReset}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Please enter your email'),
          })}
        >
          <Text
            style={{
              marginBottom: 5,
              alignSelf: 'center',
              justifyContent: 'center',
              color: Colors.colors.primaryDark,
            }}
          >
            Enter email to reset password
          </Text>
          <ResetField name='email' icon='email' placeholder='Email' />
          <SubmitButton title='submit' />
        </Form>
      )}

      {successfulCreation && (
        <Form
          initialValues={{ password: '', token: '', email: '' }}
          validationSchema={Yup.object().shape({
            token: Yup.string()
              .required('Please enter verification code.')
              .length(6, 'Code must be exactly 6 characters long'),
            email: Yup.string().email().required('Please enter your email.'),
            password: Yup.string()
              .required('Password is required')
              .min(5, 'Password is too short - should be 6 chars minimum'),
          })}
          onSubmit={onReset}
        >
          <View>
            <ResetField name='email' icon='email' placeholder='Email' />
            <ResetField
              name='token'
              icon='two-factor-authentication'
              placeholder='Code...'
            />
            <ResetField
              name='password'
              icon='lock'
              placeholder='New password'
            />
          </View>
          <SubmitButton title='submit' />
        </Form>
      )}
      <TextLink
        text='I already have a account?'
        linkText='login'
        link='login'
      />
      <TextLink
        text="I don't have a account?"
        linkText='Create Account'
        link='register'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginVertical: 10,
  },
  containerCenter: {
    padding: 2,
    marginVertical: 8,
    flexDirection: 'row',
    borderRadius: 15,
    width: '100%',
    borderColor: Colors.colors.primaryDark,
    borderWidth: 1,
  },
  icon: {
    margin: 10,
  },

  input: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
});

export default PwReset;
