import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: {},
  commentLoading: false,
  commentMap: {},
  commentError: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchCommentLoading: (state) => {
      state.commentLoading = false;
    },
    createComment: (state, { payload }) => {
      const { postId, comment } = payload;
      console.log({ postId, comment });
      if (!state.commentMap[postId]) {
        state.commentMap[postId] = [];
      }

      state.commentMap[postId] = [comment, ...state.commentMap[postId]];
    },
    getComments: (state, { payload }) => {
      state.commentLoading = false;
      const { postId, commentList } = payload;
      if (!state.commentMap[postId]) {
        state.commentMap[postId] = [];
      }
      state.commentMap[postId] = commentList;

      state.commentError = null;
    },
    getCommentError: (state, { payload }) => {
      state.commentLoading = false;
      state.commentError = payload;
    },
    clearCommentError: (state) => {
      state.commentLoading = false;
      state.commentError = null;
    },
    deleteCommentSlice: (state, { payload }) => {
      const { postId, commentId } = payload;

      state.commentMap[postId] = state.commentMap[postId].filter(
        (x) => x._id !== commentId
      );
      state.commentError = null;
    },
  },
});

export const {
  getCommentError,
  createComment,
  getComments,
  clearCommentError,
  fetchCommentLoading,
  deleteCommentSlice,
} = commentSlice.actions;

export default commentSlice.reducer;
