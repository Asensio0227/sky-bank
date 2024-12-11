import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import customFetch from '../../utils/axios';
import { SortOptions } from '../accounts/types';
import {
  applicationStatusOptions,
  employmentStatusOptions,
  loanTypeOptions,
  statusOptions,
} from './types';

const filterState = {
  search: '',
  sort: SortOptions.Latest,
  sortOptions: Object.values(SortOptions),
  status: statusOptions.All,
  statusOptions: Object.values(statusOptions),
  applicationStatus: applicationStatusOptions.All,
  applicationStatusOptions: Object.values(applicationStatusOptions),
  loanType: loanTypeOptions.All,
  loanTypeOptions: Object.values(loanTypeOptions),
  employmentStatus: employmentStatusOptions.All,
  employmentStatusOptions: Object.values(employmentStatusOptions),
};

const initialState = {
  isLoading: false,
  loans: [],
  userLoans: [],
  userLoansTotal: 0,
  loanBalance: 0,
  singleLoan: null,
  modalVisible: false,
  totalLoans: 0,
  page: 1,
  numbOfPages: 0,
  ...filterState,
};

// apply for loan (user)
export const applyForLoan = createAsyncThunk(
  'Loans/apply',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const {
        collateralValue,
        collateralType,
        loanAmount,
        employmentStatus,
        income,
        loanTerm,
        loanType,
        monthlyPayment,
      } = data;
      const numericLoanAmount = Number(loanAmount);
      const numericMonthlyPayment = Number(monthlyPayment);
      const numericIncome = Number(income);
      const numericLoanTerm = Number(loanTerm);
      const numericCollateralValue = Number(collateralValue);
      if (
        isNaN(numericCollateralValue) ||
        isNaN(numericIncome) ||
        isNaN(numericLoanTerm) ||
        isNaN(numericMonthlyPayment) ||
        isNaN(numericIncome) ||
        isNaN(numericLoanAmount)
      ) {
        throw new Error('Invalid input values');
      }
      const response = await customFetch.post('loan/apply', {
        collateralValue: numericCollateralValue,
        collateralType,
        loanAmount: numericLoanAmount,
        employmentStatus,
        income: numericIncome,
        loanTerm: numericLoanTerm,
        loanType,
        monthlyPayment: numericMonthlyPayment,
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// get all loans (user)
export const getAllLoans = createAsyncThunk(
  'Loans/getAll',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const {
        status,
        loanType,
        employmentStatus,
        sort,
        applicationStatus,
        page,
      } = thunkApi.getState().Loans;
      const params = new URLSearchParams({
        status,
        loanType,
        employmentStatus,
        sort,
        applicationStatus,
        page: String(page),
      });
      let url = `loan?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// loan payment (user)
export const loanPayment = createAsyncThunk(
  'loans/pay',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const {
        id,
        amount,
        reference,
        transactionType,
        // accountNumber
      } = data;
      const numericNumber = Number(amount);
      // const accNumber=Number(accountNumber)
      if (isNaN(numericNumber)) {
        throw new Error('Invalid input value');
      }
      const response = await customFetch.put(`loan/${id}/repay`, {
        amount,
        reference,
        accountNumber: 42144624424224240,
        transactionType,
      });
      console.log(`=====response===`);
      console.log(response);
      console.log(`=====response===`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// loan balance (user)
export const getLoanBalance = createAsyncThunk(
  'Loans/balance',
  async (id: string, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get(`loan/loan-payment/${id}`);
      console.log(`=== balance response===`);
      console.log(response);
      console.log(`=== balance response===`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// single loan
export const retrieveLoanDetails = createAsyncThunk(
  'Loans/details',
  async (id: string, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get(`loan/${id}`);
      console.log(`=====response====`);
      console.log(response);
      console.log(`=====response====`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// get all loans (admin)
export const getAllLoansAdmin = createAsyncThunk(
  'Loans/all',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const {
        search,
        status,
        loanType,
        employmentStatus,
        sort,
        applicationStatus,
        page,
      } = thunkApi.getState().Loans;
      const params = new URLSearchParams({
        status,
        loanType,
        employmentStatus,
        sort,
        applicationStatus,
        page: String(page),
        ...(search && { search }),
      });
      let url = `loan/admin?${params.toString()}`;
      const response = await customFetch.get(url);
      console.log(`===response===`);
      console.log(response);
      console.log(`===response===`);
      return response.data;
    } catch (error: any) {
      thunkApi.rejectWithValue(error.response.data || 'Error occurred thunk');
    }
  }
);
// calculate monthly payments (admin)
export const calculateLoanMonthlyPayments = createAsyncThunk(
  'Loans/calculate',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const { loanAmount, loanTerm, interestRate, id } = data;
      const numericLoanAmount = Number(loanAmount);
      const numericLoanTerm = Number(loanTerm);
      const numericInterestRate = Number(interestRate);
      if (
        isNaN(numericLoanAmount) ||
        isNaN(numericLoanTerm) ||
        isNaN(numericInterestRate)
      ) {
        throw new Error('Invalid input value');
      }
      const response = await customFetch.patch(`loan/calculate/${id}`, {
        loanAmount: numericLoanAmount,
        loanTerm: numericLoanTerm,
        interestRate: numericInterestRate,
      });
      console.log('===response====');
      console.log(response);
      console.log('===response====');
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// approve (admin)
export const approveLoanApplication = createAsyncThunk(
  'Loans/approve',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const { id, monthlyPayment } = data;
      const numericMonthlyPayment = Number(monthlyPayment);
      if (isNaN(numericMonthlyPayment)) {
        throw new Error('Invalid input value');
      }
      const response = await customFetch.put(`loan/approve/${id}`, {
        monthlyPayment,
      });
      console.log(`===response===`);
      console.log(response);
      console.log(`===response===`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);
// reject loan (admin)
export const rejectLoanApplication = createAsyncThunk(
  'Loans/rejected',
  async (id: string, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.patch(`loan/reject/${id}`);
      console.log(`===response===`);
      console.log(response);
      console.log(`===response===`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data || 'Error occurred thunk'
      );
    }
  }
);

const loanSlice = createSlice({
  name: 'Loans',
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearFilter: (state) => {
      return {
        ...state,
        ...filterState,
      };
    },
  },
  extraReducers(builder) {
    // (user) apply for loan
    builder
      .addCase(applyForLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyForLoan.fulfilled, (state, action) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Loan application submitted successfully.',
          15000,
          0
        );
      })
      .addCase(applyForLoan.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // (user) all loans
    builder
      .addCase(getAllLoans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userLoans = action.payload.loans;
        state.userLoansTotal = action.payload.totalLoans;
        state.numbOfPages = action.payload.numOfPage;
      })
      .addCase(getAllLoans.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // loan payments (user)
    builder
      .addCase(loanPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loanPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleLoan = action.payload.data;
        console.log(`===loan pay fulfilled==v`);
        console.log(action);
        console.log(`===loan pay fulfilled==v`);
        ToastAndroid.showWithGravity(
          action.payload.msg || 'Loan payment processed successfully.',
          15000,
          0
        );
      })
      .addCase(loanPayment.rejected, (state, action: any) => {
        state.isLoading = false;
        console.log(`===loan pay rejected==v`);
        console.log(action);
        console.log(`===loan pay rejected==v`);
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // get loan balance (user)
    builder
      .addCase(getLoanBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoanBalance.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getLoanBalance.rejected, (state, action: any) => {
        state.isLoading = false;
      });
    // retrieve loan details (...)
    builder
      .addCase(retrieveLoanDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveLoanDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleLoan = action.payload.loan;
      })
      .addCase(retrieveLoanDetails.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload.msg || 'An error occurred',
          15000,
          0
        );
      });
    // all loans (admin)
    builder
      .addCase(getAllLoansAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLoansAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllLoansAdmin.rejected, (state, action: any) => {
        state.isLoading = false;
      });
    // calculate loan monthly payments (admin)
    builder
      .addCase(calculateLoanMonthlyPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateLoanMonthlyPayments.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(calculateLoanMonthlyPayments.rejected, (state, action: any) => {
        state.isLoading = false;
      });
    // approve (admin)
    builder
      .addCase(approveLoanApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveLoanApplication.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(approveLoanApplication.rejected, (state, action: any) => {
        state.isLoading = false;
      });
    // reject loan (admin)
    builder
      .addCase(rejectLoanApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectLoanApplication.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(rejectLoanApplication.rejected, (state, action: any) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, handleChange, clearFilter } = loanSlice.actions;
export default loanSlice.reducer;
