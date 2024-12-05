import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Form from '../../components/form/Form';
import FormField from '../../components/form/FormField';
import SubmitButton from '../../components/form/SubmitButton';
import { palette } from '../../constants/Colors';
import { linExistingAcc } from '../../features/accounts/accountsSlice';

const Add = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const handleSubmit = async (data: any) => {
    try {
      await dispatch(linExistingAcc(data) as any);
      navigation.goBack();
    } catch (error: any) {
      console.log('Error while link account', error);
    }
  };

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
          backgroundColor: palette.primary,
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
            color: palette.white,
            marginVertical: 7,
            letterSpacing: 3,
          }}
        >
          Link Account
        </Text>
        <Form
          initialValues={{ accountNumber: '' }}
          validationSchema={Yup.object().shape({
            accountNumber: Yup.string().required('Account number is required'),
          })}
          onSubmit={handleSubmit}
        >
          <FormField
            name='format-list-numbered'
            names='accountNumber'
            placeholder='Account number'
            keyBoardType='numeric'
          />
          <SubmitButton title='submit' />
        </Form>
      </View>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({});
