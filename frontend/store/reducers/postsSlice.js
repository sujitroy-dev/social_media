import { createSlice } from "@reduxjs/toolkit";
import postsArr from "../../data/posts.json";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    recents: [...postsArr],
    friends: [],
    popular: [],
  },
  reducers: {
    fetchRecentPostsSuccess(state, action) {
      return { ...state, recents: action.payload };
    },
  },
});

export const { fetchRecentPostsSuccess } = postsSlice.actions;
export default postsSlice.reducer;
