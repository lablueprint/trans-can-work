import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
