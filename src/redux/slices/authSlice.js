import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
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
      state.userInfo = null;
    },
    fetchSocket: (state, { payload }) => {
      state.newSocket = payload;
    },
    fetchLoadingUser: (state) => {
      state.loadingUser = true;
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
    },
    logOut: (state) => {
      state.error = null;
      state.loading = false;
      state.userInfo = null;
    },
    getUserList: (state, { payload }) => {
      state.loading = false;
      state.userList = payload;
      state.error = null;
    },
    updateImage: (state, { payload }) => {
      state.loadingUser = false;
      state.userInfo = payload;
      state.error = null;
    },
    getMyProfile: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },
  },
});

export const {
  fetchLoading,
  fetchAuth,
  fetchError,
  clearError,
  logOut,
  getUserList,
  updateImage,
  getMyProfile,
  fetchLoadingUser,
  fetchSocket,
} = authSlice.actions;

export default authSlice.reducer;
