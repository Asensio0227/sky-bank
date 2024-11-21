import { userType } from '@/api/user';
import * as SecureStore from 'expo-secure-store';

const key = 'authToken';

const storeToken = async (token: userType) => {
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
