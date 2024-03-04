import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    recents: [],
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
