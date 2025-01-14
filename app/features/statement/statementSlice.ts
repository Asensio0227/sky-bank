import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import customFetch from '../../utils/axios';
import { FilterState, SortOptions, statementState } from './type';

const initialFilters: FilterState = {
  sort: SortOptions.Latest,
  sortOptions: Object.values(SortOptions),
  search: '',
};
const initialState: statementState = {
  ...initialFilters,
  statement: [],
  userStatement: [],
  singleStatement: null,
  isLoading: false,
  totalStatement: 0,
  numbOfPages: 1,
  page: 1,
};
// create statement
export const createStatement = createAsyncThunk(
  'create/statement',
  async (
    info: {
      startDate: string | Date | any;
      endDate: string | Date | any;
      accountNumber: string | number;
      location: string;
    },
    thunkApi: ThunkAPI
  ) => {
    try {
      const { startDate, endDate, accountNumber, location } = info;
      const response = await customFetch.post(`statement/${accountNumber}`, {
        startDate,
        endDate,
        location,
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// single statement
export const retrieveSingleStatement = createAsyncThunk(
  'single/statement',
  async (id: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get(`statement/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// user statement
export const retrieveUserStatement = createAsyncThunk(
  'user/statement',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const { sort, search, page } = thunkApi.getState().Statement;
      const params = new URLSearchParams({
        sort,
        page: String(page),
        ...(search && { search }),
      });
      let url = `statement?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// all statement
export const retrieveStatement = createAsyncThunk(
  'all/statement',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const { sort, search, page } = thunkApi.getState().Statement;
      const params = new URLSearchParams({
        sort,
        page: String(page),
        ...(search && { search }),
      });
      let url = `statement/admin?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);

const statementSlice = createSlice({
  name: 'Statement',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setFilters: (state: any, { payload: { name, value } }) => {
      state[name] = value;
      state.page = 1;
    },
    clearStatementFilters: (state) => {
      return { ...state, ...initialFilters };
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers(builder) {
    // create statement
    builder
      .addCase(createStatement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStatement.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createStatement.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // retrieve single  statement
    builder
      .addCase(retrieveSingleStatement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveSingleStatement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleStatement = action.payload.statement;
      })
      .addCase(retrieveSingleStatement.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // user statement
    builder
      .addCase(retrieveUserStatement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveUserStatement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStatement = action.payload.statements;
        state.numbOfPages = action.payload.numOfPage;
        state.totalStatement = action.payload.totalStatement;
      })
      .addCase(retrieveUserStatement.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // retrieve all statement
    builder
      .addCase(retrieveStatement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveStatement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statement = action.payload.statements;
        state.numbOfPages = action.payload.numOfPage;
        state.totalStatement = action.payload.totalStatement;
      })
      .addCase(retrieveStatement.rejected, (state, action: any) => {
        state.isLoading = false;
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
  setFilters,
  clearStatementFilters,
  setPage,
} = statementSlice.actions;
export default statementSlice.reducer;
