// import { Linking } from 'react-native';

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
