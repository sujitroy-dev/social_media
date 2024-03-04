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
      state.recents = action.payload;
    },
    toggleLikeFeedPost(state, action) {
      const { feedType, postID, like } = action.payload;
      const index = state[feedType]?.findIndex((post) => post.id === postID);
      state[feedType][index].liked = like;
    },
  },
});

export const { fetchRecentPostsSuccess, toggleLikeFeedPost } =
  postsSlice.actions;
export default postsSlice.reducer;
