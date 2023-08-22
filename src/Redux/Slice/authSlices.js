/* eslint-disable  no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  accessToken: null,
  refreshToken: null,
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        email, accessToken, refreshToken, user,
      } = action.payload;
      state.value = {
        isLoggedIn: true,
        email,
        accessToken,
        refreshToken,
        user,
      };
    },
    logout: (state) => {
      console.log('logout');
      state.value = initialState;
    },
    updateUser: (state, action) => {
      console.log(action.payload);
      state.value = { ...state.value, user: action.payload };
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
