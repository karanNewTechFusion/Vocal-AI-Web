// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
