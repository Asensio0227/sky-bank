import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { styles, wrapper } from '../constants/styles';
import {
  changePassword,
  closeModal,
  logout,
  toggleModal,
  updateUser,
} from '../features/auth/authSlice';
import { RootState } from '../features/auth/types';
import SkeletonContainer from './custom/Skeleton';
import DatePicker from './form/DatePicker';
import Form, { userType } from './form/Form';
import FormField from './form/FormField';
import FormImagePicker from './form/FormImagePicker';
import PhoneNumberInput from './form/PhoneNumberInput';
import SubmitButton from './form/SubmitButton';

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your name'),
  lastName: Yup.string().required('Please enter your surname'),
  gender: Yup.string().required('Please enter your gender'),
  avatar: Yup.string(),
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
});

const ModalScreen = () => {
  const { modalVisible, user, isLoading, isPassword } = useSelector(
    (store: RootState) => store.auth
  );
  const dispatch = useDispatch();

  if (!modalVisible) return;

  const handleSubmit = async (user: userType) => {
    console.log(user);
    await dispatch(updateUser(user) as any);
  };

  const handleModal = () => {
    if (isPassword) {
      dispatch(closeModal());
    } else {
      dispatch(toggleModal());
    }
  };

  const passwordSubmit = async (data: userType) => {
    try {
      const user = await dispatch(changePassword(data) as any);
      const reLogin = await dispatch(logout(user._id) as any);
    } catch (error) {
      console.error('Error changing password or logging out:', error);
    }
  };

  if (isLoading) return <SkeletonContainer />;

  return (
    <View style={styles.centerView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View
          style={[
            styles.centerView,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <ScrollView style={styles.modalView}>
            <Pressable style={[styles.buttonClose]} onPress={handleModal}>
              <MaterialCommunityIcons name='window-close' size={20} />
            </Pressable>
            {!isPassword ? (
              <Form
                initialValues={{
                  avatar: user.avatar || '',
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  ideaNumber: user.ideaNumber || '',
                  email: user.email || '',
                  physicalAddress: user.physicalAddress || '',
                  phoneNumber: user.phoneNumber || '',
                  dob: user.dob || '',
                  gender: user.gender || '',
                }}
                onSubmit={handleSubmit}
                validationSchema={validateSchema}
              >
                <FormImagePicker name='avatar' />
                <FormField
                  name='account'
                  names='firstName'
                  placeholder='Name'
                />
                <FormField
                  name='account'
                  names='lastName'
                  placeholder='surname'
                />
                <FormField
                  name='human-female-boy'
                  names='gender'
                  placeholder='Gender'
                />
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
                <PhoneNumberInput name='phoneNumber' />
                <SubmitButton title='update profile' />
              </Form>
            ) : (
              <View
                style={[
                  styles.container,
                  wrapper.aside,
                  {
                    justifyContent: 'center',
                    marginVertical: 50,
                    alignItems: 'center',
                  },
                ]}
              >
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 20,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    letterSpacing: 2,
                  }}
                >
                  Change Password
                </Text>
                <Form
                  style={{ marginTop: 20 }}
                  initialValues={{
                    oldPassword: '',
                    newPassword: '',
                  }}
                  onSubmit={passwordSubmit}
                  validationSchema={Yup.object().shape({
                    oldPassword: Yup.string()
                      .required('Password is required')
                      .min(
                        5,
                        'Password is too short - should be 6 chars minimum'
                      ),
                    newPassword: Yup.string()
                      .required('Password is required')
                      .min(
                        5,
                        'Password is too short - should be 6 chars minimum'
                      ),
                  })}
                >
                  <FormField
                    name='lock'
                    names='oldPassword'
                    keyBoardType='email-address'
                    textContent='password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder='old Password'
                  />
                  <FormField
                    name='lock'
                    names='newPassword'
                    keyBoardType='email-address'
                    textContent='password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder='new Password'
                  />
                  <SubmitButton title='change password' />
                </Form>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalScreen;
