import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import Form, { userType } from '../../components/form/Form';
import ResetField from '../../components/form/ResetField';
import SubmitButton from '../../components/form/SubmitButton';
import { Colors } from '../../constants/Colors';
import { verifyUserAccount } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';

const VerifyEmail = () => {
  const { isLoading } = useSelector((store: RootState) => store.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleChange = async (data: userType) => {
    await dispatch(verifyUserAccount(data));
    navigation.navigate('login');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Form
        initialValues={{ email: '', token: '' }}
        validationSchema={Yup.object().shape({
          token: Yup.string()
            .required('Please enter verification code.')
            .length(6, 'Code must be exactly 6 characters long'),
          email: Yup.string().email().required('Please enter your email.'),
        })}
        style={styles.inputContainer}
        onSubmit={handleChange}
      >
        <Text>Enter your code</Text>
        <ResetField name='email' icon='email' placeholder='Email' />
        <ResetField
          name='token'
          icon='two-factor-authentication'
          placeholder='Code...'
        />

        <SubmitButton title='verify email' />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.colors.primaryLight,
    textAlign: 'center',
    fontSize: 10,
    padding: 3,
    borderRadius: 5,
    width: '100%',
  },
  inputContainer: {
    color: Colors.light.text,
    backgroundColor: Colors.colors.white,
    fontSize: 24,
    width: '90%',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.dark.tabIconDefault,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.light.text,
    paddingHorizontal: 20,
  },
});

export default VerifyEmail;
