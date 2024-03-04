import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  post: postsReducer,
});

export default rootReducer;
