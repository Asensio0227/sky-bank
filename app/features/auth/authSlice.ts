import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { apiClient } from '../../../demo/api/client';
import { userType } from '../../components/form/Form';
import { storeToken } from '../../utils/storage';
import { payloadAction, UserState } from './types';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
};

export const createUserAccount = createAsyncThunk(
  'users/createAccount',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const response = await apiClient.post('auth/register', userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyUserAccount = createAsyncThunk(
  'users/verifyAccount',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, token } = userData;
      const verificationToken: number = parseFloat(token);
      const response = await apiClient.post('auth/verify-email', {
        email,
        verificationToken,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email } = userData;
      const response = await apiClient.post('auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, password, token } = userData;
      const passwordToken = parseFloat(token);
      const response = await apiClient.post('auth/reset-password', {
        email,
        token: passwordToken,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await apiClient.post('auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  'users/loadUser',
  async (thunkAPI: ThunkAPI) => {
    try {
      const response = await apiClient.get('user/showMe');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (thunkAPI: ThunkAPI) => {
    try {
      const response = await apiClient.delete('auth/logout');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    // create account
    builder
      .addCase(createUserAccount.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        createUserAccount.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      )
      .addCase(
        createUserAccount.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    // verify email
    builder
      .addCase(verifyUserAccount.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        verifyUserAccount.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      )
      .addCase(
        verifyUserAccount.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    // forgot password
    builder
      .addCase(forgotPassword.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      )
      .addCase(
        forgotPassword.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    // reset password
    builder
      .addCase(resetPassword.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        resetPassword.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      )
      .addCase(
        resetPassword.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
    // login user
    builder
      .addCase(loginUser.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(
        loginUser.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.error = action.payload.msg;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      );
    // load user
    builder
      .addCase(loadUser.pending, (state: UserState) => {
        state.isLoading = true;
        console.log(state);
      })
      .addCase(
        loadUser.fulfilled,
        (state: UserState, action: payloadAction) => {
          const { userWithoutPassword } = action.payload;
          state.isLoading = false;
          state.user = userWithoutPassword;
          storeToken(userWithoutPassword);
        }
      )
      .addCase(loadUser.rejected, (state: UserState, action: payloadAction) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // logout
    builder
      .addCase(logout.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state: UserState, action: payloadAction) => {
        state.isLoading = false;
        state.user = null;
        ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
      })
      .addCase(logout.rejected, (state: UserState, action: payloadAction) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
