import axios from "axios";
import {
  fetchCommentLoading,
  getCommentError,
  getComments,
  createComment,
} from "../slices/commentSlice";

export const getAllComment = (url) => async (dispatch) => {
  dispatch(fetchCommentLoading());
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    dispatch(getComments(data.data));
  } catch (error) {
    dispatch(getCommentError(error.response.data.message));
  }
};

export const writeComment = (url, info) => async (dispatch) => {
  dispatch(fetchCommentLoading());
  try {
    const { data } = await axios.post(url, info, { withCredentials: true });
    dispatch(createComment(data.data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(getCommentError(error.response.data.message));
  }
};

// export const deleteCommentAction = (url, id) => async (dispatch) => {
//   dispatch(fetchCommentLoading());
//   try {
//     await axios.delete(url, { withCredentials: true });

//     dispatch(deleteComment(id));
//   } catch (error) {
//     dispatch(getCommentError(error.response.data.message));
//   }
// };
