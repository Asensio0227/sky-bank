import { ThunkAPI } from '@reduxjs/toolkit';
import axios from 'axios';
const url = process.env.EXPO_PUBLIC_URL;

const customFetch = axios.create({
  baseURL: `${url}/`,
});

export const checkForUnauthorizedResponse = (
  error?: any,
  thunkAPI?: ThunkAPI
) => {
  if (error.response.status === 401) {
    // thunkAPI.dispatch(clearStore);
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;