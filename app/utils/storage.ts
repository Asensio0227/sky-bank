import * as SecureStore from 'expo-secure-store';
import { userType } from '../components/form/Form';

const key = 'authToken';

interface userWithoutPassword extends userType {
  gender?: string;
}

const storeToken = async (token: userWithoutPassword) => {
  try {
    const userInfoString = JSON.stringify(token);
    await SecureStore.setItemAsync(key, userInfoString);
  } catch (error: any) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error: any) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error: any) {
    console.log(error);
  }
};

export { getToken, removeToken, storeToken };
