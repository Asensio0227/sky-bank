import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { BankType } from '../../screens/Admin/CreateAccount';
import customFetch from '../../utils/axios';
import {
  AccountType,
  accState,
  accType,
  FilterState,
  SortOptions,
} from './types';

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
  userAccountsTotal: 0,
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
  async (id: string, thunkAPI: ThunkAPI) => {
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
// edit account (admin)
export const editAccount = createAsyncThunk(
  'accounts/edit',
  async (data: any, thunkAPI: ThunkAPI) => {
    try {
      const { id, accountNumber, branchCode, accountType } = data;
      const numericAccountNumber = Number(accountNumber);
      const numericBranchCode = Number(branchCode);
      if (isNaN(numericAccountNumber) || isNaN(numericBranchCode)) {
        throw new Error('Invalid account number or branch code');
      }
      const response = await customFetch.patch(`account/update/${id}`, {
        accountNumber: numericAccountNumber,
        branchCode: numericBranchCode,
        accountType,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'Error while editing: thunk '
      );
    }
  }
);
// get all user's acc (user)
export const getAllUserAcc = createAsyncThunk(
  'accounts/getAllAcc',
  async (_, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.get('account');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'error get all user acc:thunk'
      );
    }
  }
);
// link existing acc (user)
export const linExistingAcc = createAsyncThunk(
  'accounts/linkAcc',
  async (data: any, thunkAPI: ThunkAPI) => {
    try {
      const { accountNumber } = data;
      const numericAccountNumber = Number(accountNumber);
      if (isNaN(numericAccountNumber)) {
        throw new Error('Invalid account number');
      }
      const response = await customFetch.post('account/link', {
        accountNumber: numericAccountNumber,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.msg || 'error linking acc: thunk'
      );
    }
  }
);
// get single acc (user)
export const getSingleAcc = createAsyncThunk(
  'accounts/getSingle',
  async (id: string, thunkAPI: ThunkAPI) => {
    try {
      const response = await customFetch.get(`account/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response || 'error getting single account:thunk'
      );
    }
  }
);
// update acc (user)
export const updateUserAcc = createAsyncThunk(
  'accounts/updateUserAcc',
  async (data: any, thunkAPI: ThunkAPI) => {
    try {
      const { _id, overdraftLimit } = data;
      const numericLimitNumber = Number(overdraftLimit);
      if (isNaN(numericLimitNumber)) {
        throw new Error('Invalid limit number');
      }
      const response = await customFetch.put(
        `account/update-user-account/${_id}`,
        {
          overdraftLimit: numericLimitNumber,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
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
    handleChange: (
      state,
      {
        payload: { name, value },
      }: { payload: { name: keyof accType; value: accType[typeof name] } }
    ) => {
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
          action.payload || 'Error occurred!',
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
          action.payload || 'Error occurred!',
          15000,
          0
        );
      });
    // delete account
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.Loader = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action: any) => {
        state.Loader = false;
        state.modalVisible = false;
        const deletedAccountId = action.meta.arg;
        state.accounts = state.accounts.filter(
          (account: any) => account._id !== deletedAccountId
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
          action.payload || 'Error occurred while deleting.',
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
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Account updated successfully.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .addCase(editAccount.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Loader = false;
        ToastAndroid.showWithGravity(
          action.payload || 'Error occurred while editing.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // get all user
    builder
      .addCase(getAllUserAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserAcc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAccounts = action.payload.account;
        state.userAccountsTotal = action.payload.length;
      })
      .addCase(getAllUserAcc.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload || 'Error occurred while editing.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // link acc
    builder
      .addCase(linExistingAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linExistingAcc.fulfilled, (state: accState, action: any) => {
        state.isLoading = false;
        const accountExists = state.userAccounts.some(
          (acc: any) => acc._id === action.payload.account._id
        );

        if (!accountExists) {
          state.userAccounts.push(action.payload.account);
          state.userAccountsTotal = state.userAccounts.length;
          ToastAndroid.showWithGravity(
            'Account linked successfully.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        } else {
          state.userAccounts = state.userAccounts.map((acc) =>
            acc._id === action.payload.account._id
              ? action.payload.account
              : acc
          );
          ToastAndroid.showWithGravity(
            'Account updated successfully.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
        ToastAndroid.showWithGravity(
          'Account linked successfully.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .addCase(linExistingAcc.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload || 'Error occurred while linking account.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // get single acc
    builder
      .addCase(getSingleAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleAcc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleAccount = action.payload.account;
      })
      .addCase(getSingleAcc.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload || 'Error occurred while linking account.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    // update user Acc
    builder
      .addCase(updateUserAcc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAcc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleAccount = action.payload.account;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Account updated successfully.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      })
      .addCase(updateUserAcc.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload || 'Error occurred while updating account.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
  },
});

export const {
  handleChange,
  handlePage,
  clearFilters,
  openModal,
  closeModal,
  hideLoading,
  showLoading,
} = accountsSlice.actions;
export default accountsSlice.reducer;
