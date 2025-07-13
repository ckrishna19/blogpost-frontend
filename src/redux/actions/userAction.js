import axios from "axios";
import {
  fetchAuth,
  fetchError,
  fetchLoading,
  logOut,
} from "../slices/authSlice";
import {
  fetchUserError,
  fetchUserList,
  loadingUserSlice,
} from "../slices/userSlice";

export const fetchUser = (info, url) => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    const { data } = await axios.post(url, info, { withCredentials: true });
    console.log(data.data);
    dispatch(fetchAuth(data.data));
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
  }
};

export const logoutUser = (url) => async (dispatch) => {
  dispatch(fetchLoading());
  try {
    dispatch(logOut(await axios.post(url, null, { withCredentials: true })));
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
  }
};

export const userList = (url) => async (dispatch) => {
  dispatch(loadingUserSlice());
  try {
    const { data } = await axios.get(url, { withCredentials: true });

    dispatch(fetchUserList(data.data));
  } catch (error) {
    dispatch(fetchUserError(error.response.data.message));
  }
};
