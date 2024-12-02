import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './app/features/accounts/accountsSlice';
import authSlice from './app/features/auth/authSlice';
import userSlice from './app/features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    AllUserState: userSlice,
    accounts: accountsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
