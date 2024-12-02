import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { BankType } from '../../screens/Admin/CreateAccount';
import customFetch from '../../utils/axios';

const initialState = {
  accounts: [],
  balance: 0,
  transactions: [],
  isLoading: false,
};

export const createAccount = createAsyncThunk(
  'accounts/create',
  async (data: BankType, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.post('account/admin', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
      })
      .addCase(createAccount.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred!',
          15000,
          0
        );
      });
  },
});

export default accountsSlice.reducer;
