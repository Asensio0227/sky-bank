// import { Linking } from 'react-native';

import { userType } from '../components/form/Form';

// const makeCall = (phoneNumber) => {
//   let formattedNumber = '';
//   if (Platform.OS === 'android') {
//     formattedNumber = `tel:${phoneNumber}`;
//   } else {
//     formattedNumber = `telprompt:${phoneNumber}`;
//   }
//   Linking.openURL(formattedNumber).catch((err) => console.error('Error:', err));
// };

export function formatDate(rawDate: Date) {
  const date = new Date(rawDate);
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDay();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day}-${month}-${year}`;
}
export interface FormType extends userType {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | undefined;
  dob: string;
  phoneNumber: string;
}

export const formData = (user: FormType) => {
  const formData = new FormData();
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('email', user.email);
  if (user.avatar) {
    formData.append('avatar', user.avatar);
  }
  formData.append('dob', user.dob);
  formData.append('phoneNumber', user.phoneNumber);
  let userObject = {};

  formData.forEach((part) => {
    userObject[part[0]] = part[1];
  });
  return userObject;
};
