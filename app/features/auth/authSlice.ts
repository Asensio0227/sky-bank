import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { userType } from '../../components/form/Form';
import customFetch from '../../utils/axios';
import { removeToken, storeToken } from '../../utils/storage';
import { payloadAction, UserState } from './types';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  isError: false,
  modalVisible: false,
  isPassword: false,
};

export interface ApiResponse {
  msg?: string;
  user?: userType;
  users?: userType;
}

export const createUserAccount = createAsyncThunk<ApiResponse, userType>(
  'users/createAccount',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.post('auth/register', userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyUserAccount = createAsyncThunk<ApiResponse, userType>(
  'users/verifyAccount',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, token } = userData;
      const verificationToken: number = parseFloat(token);
      const response = await customFetch.post('auth/verify-email', {
        email,
        verificationToken,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk<ApiResponse, userType>(
  'users/forgotPassword',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email } = userData;
      const response = await customFetch.post('auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk<ApiResponse, userType>(
  'users/resetPassword',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, password, token } = userData;
      const passwordToken = parseFloat(token);
      const response = await customFetch.post('auth/reset-password', {
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

export const loginUser = createAsyncThunk<ApiResponse, userType>(
  'users/login',
  async (userData: userType, thunkAPI: ThunkAPI) => {
    try {
      const { email, password } = userData;
      const response = await customFetch.post('auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network Error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loadUser = createAsyncThunk<ApiResponse, userType>(
  'users/loadUser',
  async (thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.get('user/showMe');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk<ApiResponse, userType>(
  'users/logout',
  async (thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.delete('auth/logout');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk<ApiResponse, userType>(
  'user/updateUser',
  async (userData: any, thunkAPI: ThunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('avatar', userData.avatar);
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('gender', userData.gender);
      formData.append('email', userData.email);
      formData.append('dob', userData.dob);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('ideaNumber', userData.ideaNumber);
      formData.append('physicalAddress', userData.physicalAddress);
      const response = await customFetch.patch(`user/updateUser`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network Error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const changePassword = createAsyncThunk<ApiResponse, userType>(
  'users/changePassword',
  async (data, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.patch('user/updateUserPassword', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data
        : 'Network Error';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const clearStore = createAsyncThunk(
  'users/clearStore',
  async (thunkApi: ThunkAPI) => {
    try {
      thunkApi.dispatch(logout());
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject();
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleModal: (state) => {
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    },
    togglePasswordModal: (state) => {
      return {
        ...state,
        isPassword: true,
        modalVisible: true,
      };
    },
    closeModal: (state) => {
      return {
        ...state,
        isPassword: false,
        modalVisible: false,
      };
    },
  },
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
          state.isError = true;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
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
          state.isError = true;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
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
          state.isError = true;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
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
          state.isError = true;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
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
          state.isError = true;
          state.error = action.payload.msg;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
        }
      );
    // load user
    builder
      .addCase(loadUser.pending, (state: UserState) => {
        state.isLoading = true;
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
        state.isError = true;
        state.error = action.payload;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // logout
    builder
      .addCase(logout.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state: UserState, action: payloadAction) => {
        state.isLoading = false;
        state.user = null;
        removeToken();
        ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
      })
      .addCase(logout.rejected, (state: UserState, action: payloadAction) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // update user
    builder
      .addCase(updateUser.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state: UserState, action: payloadAction) => {
          const { user } = action.payload;
          state.isLoading = false;
          state.modalVisible = false;
          state.user = user;
          storeToken(user);
          ToastAndroid.showWithGravity('User updated!', 15000, 0);
        }
      )
      .addCase(
        updateUser.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.isError = true;
          state.modalVisible = false;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
        }
      );
    // change password
    builder
      .addCase(changePassword.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(
        changePassword.fulfilled,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.modalVisible = false;
          state.isPassword = false;
          ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
        }
      )
      .addCase(
        changePassword.rejected,
        (state: UserState, action: payloadAction) => {
          state.isLoading = false;
          state.isError = true;
          state.modalVisible = false;
          state.isPassword = false;
          state.error = action.payload;
          ToastAndroid.showWithGravity(
            action.payload.msg || 'An error occurred',
            15000,
            0
          );
        }
      );
  },
});

export const { toggleModal, togglePasswordModal, closeModal } =
  authSlice.actions;
export default authSlice.reducer;
