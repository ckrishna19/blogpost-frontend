import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeLoading: false,
  likePost: null,
  likeMap: {},
  likeError: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    fetchLikeLoading: (state) => {
      state.likeLoading = true;
    },
    likePostByUser: (state, { payload }) => {
      state.likeLoading = false;
      const { postId, likedBy } = payload;
      console.log({ postId, likedBy });
      if (!state.likeMap[postId]) {
        state.likeMap[postId] = [];
      }
      state.likeMap[postId] = [likedBy, ...state.likeMap[postId]];
    },
    fetchLikeError: (state, { payload }) => {
      state.likeLoading = false;
      state.likeError = payload;
    },
    fetchLikeList: (state, { payload }) => {
      const { postId, likedBy } = payload;
      state.likeError = null;
      state.likeLoading = false;

      state.likeMap[postId] = likedBy;
    },
    unLikePost: (state, { payload }) => {
      const { postId, unLikedBy } = payload;
      state.likeLoading = false;
      state.likeMap[postId] = state.likeMap[postId].filter(
        (x) => x !== unLikedBy
      );
      state.likeError = null;
    },
  },
});

export const {
  fetchLikeError,
  fetchLikeLoading,
  likePostByUser,
  fetchLikeList,
  unLikePost,
} = likeSlice.actions;

export default likeSlice.reducer;
