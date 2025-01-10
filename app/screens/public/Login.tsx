import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loading from '../../components/custom/Loading';
import TextLink from '../../components/custom/TextLink';
import Form, { userType } from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import { loginUser } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';
import useLocation from '../../hooks/useLocation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter a valid email!'),
  password: Yup.string().required('Please enter a password!'),
  location: Yup.string(),
});

const Login = () => {
  const { isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const { location } = useLocation();

  const onSignInPress = async (data: userType | any) => {
    await dispatch(loginUser(data) as any);
  };

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          email: '',
          password: '',
          location: location || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSignInPress}
      >
        <FormField name='email' names='email' placeholder='Email' />

        <FormField
          name='lock'
          names='password'
          placeholder='password'
          secureTextEntry={true}
        />
        <SubmitButton title='login' />
      </Form>
      <TextLink
        text="I don't have an account?"
        linkText='Create Account'
        link='register'
      />
      <TextLink
        text='I forgot my password?'
        linkText='Reset password?'
        link='reset'
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
    position: 'relative',
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

export default Login;
