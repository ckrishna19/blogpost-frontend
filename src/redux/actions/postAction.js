import axios from "axios";
import {
  fetchPostLoading,
  createPost,
  fetchError,
  getAllPosts,
  updatePostSlice,
} from "../slices/postSlice";

export const newPost = (details, url) => async (dispatch) => {
  dispatch(fetchPostLoading());
  try {
    const { data } = await axios.post(url, details, { withCredentials: true });
    dispatch(createPost(data.data));
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
  }
};

export const getAllPost = (url) => async (dispatch) => {
  dispatch(fetchPostLoading());
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    dispatch(getAllPosts(data.data));
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
  }
};

export const updatePostAction = (url, info) => async (dispatch) => {
  dispatch(fetchPostLoading());
  try {
    const { data } = await axios.patch(url, info, { withCredentials: true });
    dispatch(updatePostSlice(data.data));
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
  }
};
