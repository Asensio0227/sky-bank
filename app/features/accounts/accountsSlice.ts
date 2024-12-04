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
  singleAccount: null,
  totalAccount: 0,
  numbOfPages: 1,
  page: 1,
  ...initialFilterState,
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
      console.log(`===payload===`);
      console.log(payload);
      console.log(`===payload===`);
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
  },
});

export const { handleChange, handlePage, clearFilters, openModal, closeModal } =
  accountsSlice.actions;
export default accountsSlice.reducer;
