import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import customFetch from '../../utils/axios';
import { SortOptions } from '../accounts/types';
import { reportStatusOptions } from './types';

const filterReportState = {
  search: '',
  sort: SortOptions.Latest,
  SortOptions: Object.values(SortOptions),
  reportStatus: reportStatusOptions.All,
  reportOptions: Object.values(reportStatusOptions),
};

const initialState = {
  isLoading: true,
  reports: [],
  report: null,
  totalReports: 0,
  page: 1,
  numbOfPages: 0,
  ...filterReportState,
};

// create audit (admin)
export const createAudit = createAsyncThunk(
  'reports/create',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.post(
        'report/transactions/audit-logs',
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// single audit (admin)
export const retrieveSingleAudit = createAsyncThunk(
  'reports/retrieveAudit',
  async (id: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get(`report/transaction/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// retrieve user's audit (admin)
export const retrieveAudits = createAsyncThunk(
  'reports/retrieve',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const { search, sort, reportStatus, page } = thunkApi.getState().Reports;
      const params = new URLSearchParams({
        search,
        sort,
        reportStatus,
        page,
      });
      const response = await customFetch.get('report/transactions/audit-logs', {
        params,
      });

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// update audit (admin)
export const updateAudit = createAsyncThunk(
  'reports/update',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.patch(
        `report/transactions/audit-logs/${data.id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const reportSlice = createSlice({
  name: 'Reports',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setReportPage: (state, action) => {
      state.page = action.payload;
    },
    handleReportChange: (state: any, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearReportFilters: (state) => {
      return {
        ...state,
        ...filterReportState,
      };
    },
  },
  extraReducers(builder) {
    // create audit
    builder
      .addCase(createAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAudit.fulfilled, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Report created successfully!',
          15000,
          0
        );
      })
      .addCase(createAudit.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred!',
          15000,
          0
        );
      });
    // retrieve single
    builder
      .addCase(retrieveSingleAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveSingleAudit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.report = action.payload.report;
      })
      .addCase(retrieveSingleAudit.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred!',
          15000,
          0
        );
      });
    builder
      .addCase(retrieveAudits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAudits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload.resultArray;
        state.totalReports = action.payload.totalReport;
        state.numbOfPages = action.payload.numOfPages;
      })
      .addCase(retrieveAudits.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred!',
          15000,
          0
        );
      });
    // update audit
    builder
      .addCase(updateAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAudit.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.reports = state.reports.map((report: any) =>
          report._id === action.payload.updatedReport._id
            ? { ...report, ...action.payload.updatedReport }
            : report
        );
        ToastAndroid.showWithGravity('Update Report!', 15000, 0);
      })
      .addCase(updateAudit.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Error occurred!',
          15000,
          0
        );
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleReportChange,
  setReportPage,
  clearReportFilters,
} = reportSlice.actions;
export default reportSlice.reducer;
