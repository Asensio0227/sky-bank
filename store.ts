import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './app/features/accounts/accountsSlice';
import authSlice from './app/features/auth/authSlice';
import loanSlice from './app/features/loans/loanSlice';
import reportSlice from './app/features/reports/reportSlice';
import roomSlice from './app/features/room/roomSlice';
import statementSlice from './app/features/statement/statementSlice';
import transactionSlice from './app/features/transaction/transactionSlice';
import userSlice from './app/features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    allUser: userSlice,
    allAccounts: accountsSlice,
    AllTransactions: transactionSlice,
    Loans: loanSlice,
    Reports: reportSlice,
    Room: roomSlice,
    Statement: statementSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
