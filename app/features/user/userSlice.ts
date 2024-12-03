import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { ThunkAPI } from 'redux-thunk';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { userType } from './../../components/form/Form';
import { FilterState, Roles, SortOptions, UserState } from './types';

const initialFilterState: FilterState = {
  search: '',
  roles: Roles.All,
  rolesOptions: Object.values(Roles),
  sort: SortOptions.Latest,
  sortOptions: Object.values(SortOptions),
};

const initialState: UserState = {
  isLoading: true,
  userLoading: false,
  banned: false,
  users: [],
  singleUser: {},
  totalUsers: 0,
  numOfPages: 1,
  page: 1,
  ...initialFilterState,
};

export const getAllUsers = createAsyncThunk(
  'users/getall',
  async (_, thunkAPI: ThunkAPI) => {
    const { page, search, sort, roles, banned } = thunkAPI.getState().allUser;
    const params = new URLSearchParams({
      roles,
      banned,
      sort,
      page: String(page),
      ...(search && { search }),
    });

    const url = `user?${params.toString()}`;

    try {
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async (
    { user, actionType }: { user: userType | any; actionType: string },
    thunkAPI: ThunkAPI
  ) => {
    try {
      let payload;
      if (actionType === 'ban') {
        payload = { banned: !user.banned };
      } else if (actionType === 'changeRole') {
        payload = { roles: user.newRole };
      } else {
        throw new Error('Invalid action type');
      }
      const response = await customFetch.patch(
        `user/updateUserStatus/${user._id}`,
        payload
      );

      return response.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  'users/getSingleUser',
  async (id: string, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.get(`user/${id}`);
      return response.data;
    } catch (error: any) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.delete(`user/${id}`);
      return response.data;
    } catch (error: unknown) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);

const userSlice = createSlice({
  name: 'allUser',
  initialState,
  reducers: {
    showLoading: (state: UserState) => {
      state.isLoading = true;
    },
    hideLoading: (state: UserState) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    handlePage: (state, { payload }) => {
      state.page = payload;
    },
    clearFilters: (state: UserState) => {
      return { ...state, ...initialFilterState };
    },
    clearAllUserState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // get all user
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.isLoading = false;
          state.users = action.payload.users;
          state.numOfPages = action.payload.numbOfPages;
          state.totalUsers = action.payload.totalUsers;
        }
      )
      .addCase(getAllUsers.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.error.message || 'An error occurred',
          15000,
          0
        );
      });
    // update user
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.userLoading = false;
        (state.singleUser = action.payload.user),
          ToastAndroid.showWithGravity(
            'User status updated successfully!',
            15000,
            0
          );
      })
      .addCase(updateUserStatus.rejected, (state, action: any) => {
        state.userLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // single user
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.singleUser = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action: any) => {
        state.userLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userLoading = false;
        ToastAndroid.showWithGravity(action.payload.msg, 15000, 0);
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        state.userLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  handlePage,
  clearFilters,
  clearAllUserState,
} = userSlice.actions;
export default userSlice.reducer;
