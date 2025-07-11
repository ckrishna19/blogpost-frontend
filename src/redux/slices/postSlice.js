import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  post: {},
  error: null,
  postList: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostLoading: (state) => {
      state.loading = true;
    },
    createPost: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
      state.postList = [payload, ...state.postList];
      state.error = null;
    },
    fetchError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getAllPosts: (state, { payload }) => {
      state.loading = false;
      state.postList = payload;
      state.error = null;
    },
    updatePostSlice: (state, { payload }) => {
      console.log(payload);
      const index = state.postList.findIndex(
        (post) => post._id === payload._id
      );
      if (index !== -1) {
        state.postList[index] = payload;
      }
      state.loading = false;

      state.error = null;
    },

    deletePostSlice: (state, { payload }) => {
      state.loading = false;
      state.postList = state.postList.filter((x) => x._id !== payload);
      state.error = null;
    },
  },
});

export const {
  fetchError,
  createPost,
  fetchPostLoading,
  getAllPosts,
  updatePostSlice,
  deletePostSlice,
} = postSlice.actions;

export default postSlice.reducer;
