import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import customFetch from '../../utils/axios';
import { AccountType, SortOptions } from '../accounts/types';
import {
  CardType,
  FilterState,
  reversalOptions,
  statusOptions,
  transactionOptions,
  transactionState,
} from './types';

const initialFilterState: FilterState = {
  search: '',
  sort: SortOptions.Latest,
  sortOptions: Object.values(SortOptions),
  accountType: AccountType.All,
  accountTypeOptions: Object.values(AccountType),
  transactionType: transactionOptions.All,
  transactionOption: Object.values(transactionOptions),
  type: CardType.All,
  typeOptions: Object.values(CardType),
  status: statusOptions.All,
  statusOptions: Object.values(statusOptions),
  reversal: reversalOptions.All,
  reversalOptions: Object.values(reversalOptions),
};

const initialState: transactionState = {
  isLoading: false,
  modalVisible: false,
  userTransactionsTotal: 0,
  transactions: [],
  userTransactions: [],
  totalTransactions: 0,
  numbOfPages: 1,
  page: 1,
  ...initialFilterState,
};
// user transactions history
export const retrieveAllTransactions = createAsyncThunk(
  'transactions/retrieveAllTransactions',
  async (accountNumber: any, thunkApi: any) => {
    try {
      const { type, transactionType, sort, status, page, reversal } =
        thunkApi.getState().AllTransactions;
      const params = new URLSearchParams({
        type,
        transactionType,
        sort,
        reversal,
        status,
        page: String(page),
      });
      const url = `transaction/${accountNumber}?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data || 'Error occurred!');
    }
  }
);
// transfer
export const transferMoney = createAsyncThunk(
  'transactions/transfer',
  async ({ data, id }: { data: any; id: string }, thunkApi: ThunkAPI) => {
    try {
      const { amount, toAccountNumber } = data;
      const numericAmount = Number(amount);
      const numericToAccountNumber = Number(toAccountNumber);
      if (isNaN(numericAmount) || isNaN(numericToAccountNumber)) {
        throw new Error('Amount and Account Number must be a number');
      }
      const accInfo = {
        ...data,
        amount: numericAmount,
        toAccountNumber: numericToAccountNumber,
      };
      const response = await customFetch.post(
        `transaction/transfer/${id}`,
        accInfo
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data || 'Error occurred!');
    }
  }
);
// admin / get all trans
export const retrieveTransactions = createAsyncThunk(
  'transactions/AllTransactions',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const { type, transactionType, sort, status, page, search, reversal } =
        thunkApi.getState().AllTransactions;
      const params = new URLSearchParams({
        type,
        transactionType,
        sort,
        status,
        reversal,
        page: String(page),
        ...(search && { search }),
      });
      const response = await customFetch.get(
        `transaction/admin?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);

const transactionSlice = createSlice({
  name: 'AllTransactions',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state: any, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    handlePage: (state, { payload }) => {
      state.page = payload;
    },
    clearFilter: (state) => {
      return { ...state, ...initialFilterState };
    },
  },
  extraReducers(builder) {
    // retrieve all
    builder
      .addCase(retrieveAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userTransactions = action.payload.transactions;
        state.userTransactionsTotal = action.payload.totalTransactions;
        state.numbOfPages = action.payload.numOfPages;
      })
      .addCase(retrieveAllTransactions.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.error.message || 'An error occurred',
          15000,
          0
        );
      });
    // transfer
    builder
      .addCase(transferMoney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Transaction successful',
          15000,
          0
        );
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.error.message || 'An error occurred',
          15000,
          0
        );
      });
    // retrieve all transaction (admin)
    builder
      .addCase(retrieveTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.totalTransactions = action.payload.totalTransactions;
        state.numbOfPages = action.payload.numOfPages;
      })
      .addCase(retrieveTransactions.rejected, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.error.message || 'An error occurred',
          15000,
          0
        );
      });
  },
});

export const { handleChange, handlePage, clearFilter, hideLoading } =
  transactionSlice.actions;
export default transactionSlice.reducer;
