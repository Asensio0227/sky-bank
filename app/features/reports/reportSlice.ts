import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
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
  async (data: any, thunkApi: ThunkAPI) => {}
);
// retrieve user's audit (admin)
export const retrieveAudits = createAsyncThunk(
  'reports/retrieve',
  async (data: any, thunkApi: ThunkAPI) => {}
);
// single audit (admin)
export const retrieveSingleAudit = createAsyncThunk(
  'reports/retrieveAudit',
  async (data: any, thunkApi: ThunkAPI) => {}
);
// create user's audit (admin)
export const auditLogs = createAsyncThunk(
  'reports/logs',
  async (data: any, thunkApi: ThunkAPI) => {}
);
// update audit (admin)
export const updateAudit = createAsyncThunk(
  'reports/update',
  async (data: any, thunkApi: ThunkAPI) => {}
);
// report on transaction (admin)
export const auditTransaction = createAsyncThunk(
  'reports/transaction',
  async (data: any, thunkApi: ThunkAPI) => {}
);
// retrieve audit logs (admin)
export const retrieveAuditLogs = createAsyncThunk(
  'reports/create',
  async (data: any, thunkApi: ThunkAPI) => {}
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
  },
  extraReducers(builder) {
    builder
      .addCase(createAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAudit.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(createAudit.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(retrieveAudits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAudits.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAudits.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(retrieveSingleAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveSingleAudit.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveSingleAudit.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(auditLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auditLogs.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(auditLogs.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(updateAudit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAudit.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAudit.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(auditTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auditTransaction.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(auditTransaction.rejected, (state) => {
        state.isLoading = true;
      });
    builder
      .addCase(retrieveAuditLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAuditLogs.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAuditLogs.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export const { showLoading, hideLoading } = reportSlice.actions;
export default reportSlice.reducer;
