// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null, // ✅ add token field
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;  // expects { user, token }
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token'); // ✅ clear token from storage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
