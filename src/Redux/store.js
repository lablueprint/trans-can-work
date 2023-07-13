import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlices';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
