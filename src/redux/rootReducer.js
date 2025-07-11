import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import likeReducer from "./slices/likeSlice";
const appReducer = combineReducers({
  authInfo: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  like: likeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logOut") {
    state = undefined;
    return state;
  }
  return appReducer(state, action);
};

export default rootReducer;
