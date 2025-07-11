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
    loadingUser: (state) => {
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
  },
});

export const { fetchUserError, fetchUserList, loadingUser } = userSlice.actions;

export default userSlice.reducer;
