import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SkeletonContainer from '../../components/custom/Skeleton';
import TextLink from '../../components/custom/TextLink';
import Form, { userType } from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import { loginUser } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';
import { expoPushNotification } from '../../features/user/userSlice';
import useLocation from '../../hooks/useLocation';
import { usePushNotifications } from '../../hooks/useNotifications';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter a valid email!'),
  password: Yup.string().required('Please enter a password!'),
});

const Login = () => {
  const { isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const { location } = useLocation();
  const { expoPushToken } = usePushNotifications();
  console.log(`===expoPushToken====`);
  console.log(expoPushToken);
  console.log(`===expoPushToken====`);

  if (expoPushToken === undefined && location === undefined) {
    alert('Please await few minutes, network is slow');
    return;
  }

  const onSignInPress = async (data: userType | any) => {
    const info = { location, ...data };
    await dispatch(loginUser(info) as any);
    expoPushToken && (await dispatch(expoPushNotification(expoPushToken)));
  };

  if (isLoading) return <SkeletonContainer />;

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          email: '',
          password: '',
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
