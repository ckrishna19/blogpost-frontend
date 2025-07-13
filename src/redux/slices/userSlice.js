import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  user: {},
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingUserSlice: (state) => {
      state.loading = true;
    },
    fetchUserList: (state, { payload }) => {
      state.error = null;
      state.userList = payload;
      state.loading = false;
    },
    fetchUserError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getMyProfile: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    updateImageSlice: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    clearUserError: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserError,
  fetchUserList,
  loadingUserSlice,
  updateImageSlice,
  clearUserError,
  getMyProfile,
} = userSlice.actions;

export default userSlice.reducer;
