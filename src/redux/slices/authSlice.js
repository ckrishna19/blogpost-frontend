import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage?.getItem("loggedInUser")) || null,
  loading: false,
  error: null,
  userList: [],
  loadingUser: false,
  newSocket: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchAuth: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },
    fetchError: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
      state.loadingUser = false;
    },
    logOut: (state) => {
      state.error = null;
      state.loading = false;
      state.userInfo = null;
    },
  },
});

export const { fetchLoading, fetchAuth, fetchError, clearError, logOut } =
  authSlice.actions;

export default authSlice.reducer;
