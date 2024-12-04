import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { BankType } from '../../screens/Admin/CreateAccount';
import customFetch from '../../utils/axios';
import { AccountType, FilterState, SortOptions } from './types';

const initialFilterState: FilterState = {
  search: '',
  sort: SortOptions.Latest,
  sortOptions: Object.values(SortOptions),
  accountType: AccountType.All,
  accountTypeOptions: Object.values(AccountType),
};

const initialState = {
  isLoading: true,
  Loader: false,
  modalVisible: false,
  accounts: [],
  userAccounts: [],
  singleAccount: null,
  totalAccount: 0,
  numbOfPages: 1,
  page: 1,
  ...initialFilterState,
};
// create account (except user)
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
// get all accounts (except user)
export const getAllAccounts = createAsyncThunk(
  'accounts/getAll',
  async (_, thunkAPI: ThunkAPI) => {
    try {
      const { page, search, sort, accountType } =
        thunkAPI.getState().allAccounts;
      const params = new URLSearchParams({
        accountType,
        sort,
        page: String(page),
        ...(search && { search }),
      });
      const url = `account/admin?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// delete account (admin)
export const deleteAccount = createAsyncThunk(
  'accounts/delete',
  async (id, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.delete(`account/admin/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'Error while deleting: thunk'
      );
    }
  }
);
// edit account (user)
export const editAccount = createAsyncThunk(
  'accounts/edit',
  async (id, thunkAPI: ThunkAPI) => {
    try {
      console.log(`====id===`);
      console.log(id);
      console.log(`====id===`);
      const response = await customFetch.patch(`account/update/${id}`);
      console.log(`====response===`);
      console.log(response);
      console.log(`====response===`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'Error while editing: thunk '
      );
    }
  }
);
// get all user's acc
export const getAllUserAcc = createAsyncThunk(
  'accounts/getAllAcc',
  async (_, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.get('account');
      console.log(`===response===`);
      console.log(response);
      console.log(`===response===`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'error get all user acc:thunk'
      );
    }
  }
);
// link existing acc
export const linExistingAcc = createAsyncThunk(
  'accounts/linkAcc',
  async (accNum, thunkAPI: ThunkAPI) => {
    try {
      console.log(`===accNum====`);
      console.log(accNum);
      console.log(`===accNum====`);
      const response = await customFetch.post('account/link', {
        accountNumber: accNum,
      });
      console.log(`===response===`);
      console.log(response);
      console.log(`===response===`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'error linking acc: thunk'
      );
    }
  }
);
// get single acc
export const getSingleAcc = createAsyncThunk(
  'accounts/getSingle',
  async (id: string, thunkAPI: ThunkAPI) => {
    try {
      console.log(`===id===`);
      console.log(id);
      console.log(`===id===`);
      const response = await customFetch.get(`account/${id}`);
      console.log(`====response===`);
      console.log(response);
      console.log(`====response===`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectedWithValue(
        error.response.msg || 'error getting single account:thunk'
      );
    }
  }
);

const accountsSlice = createSlice({
  name: 'allAccounts',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    handlePage: (state, { payload }) => {
      state.page = payload;
    },
    openModal: (state, { payload }) => {
      return {
        ...state,
        singleAccount: payload,
        modalVisible: true,
      };
    },
    closeModal: (state) => {
      return {
        ...state,
        singleAccount: null,
        modalVisible: false,
      };
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
  },
  extraReducers(builder) {
    builder
      // create
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Account created successfully.',
          15000,
          0
        );
      })
      .addCase(createAccount.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred!',
          15000,
          0
        );
      });
    // getAll
    builder
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload.accounts;
        state.totalAccount = action.payload.totalAccount;
        state.numbOfPages = action.payload.numbOfPage;
      })
      .addCase(getAllAccounts.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred!',
          15000,
          0
        );
      });
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.Loader = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.Loader = false;
        state.modalVisible = false;
        const deletedAccountId = action.meta.arg;
        state.accounts = state.accounts.filter(
          (account) => account._id !== deletedAccountId
        );
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Account deleted successfully.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .addCase(deleteAccount.rejected, (state, action: any) => {
        state.Loader = false;
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred while deleting.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // edit account
    builder
      .addCase(editAccount.pending, (state) => {
        (state.isLoading = true), (state.Loader = true);
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Loader = false;
        console.log(`===fulfilled====`);
        console.log(action);
        console.log(`===fulfilled====`);
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Account updated successfully.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .addCase(editAccount.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Loader = false;
        console.log(`=====rejected==`);
        console.log(action);
        console.log(`=====rejected==`);
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred while editing.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // get all user
    builder
      .addCase(getAllUserAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserAcc.fulfilled, (state, action) => {})
      .addCase(getAllUserAcc.rejected, (state, action: any) => {});
    // link acc
    builder
      .addCase(linExistingAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linExistingAcc.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(linExistingAcc.rejected, (state) => {
        state.isLoading = false;
      });
    // get single acc
    builder
      .addCase(getSingleAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleAcc.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getSingleAcc.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { handleChange, handlePage, clearFilters, openModal, closeModal } =
  accountsSlice.actions;
export default accountsSlice.reducer;
