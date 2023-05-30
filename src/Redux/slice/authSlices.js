/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  accessToken: null,
  refreshToken: null,
  user: {},
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        email, accessToken, refreshToken, user,
      } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
    },
    logout: (state) => {
      console.log('logout');
      state.value = initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
