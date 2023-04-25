import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlices';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
