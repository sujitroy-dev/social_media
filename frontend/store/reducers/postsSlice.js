import { createSlice } from "@reduxjs/toolkit";
import postsArr from "../../data/posts.json";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    recents: { loading: false, error: null, posts: [...postsArr] },
    friends: { loading: false, error: null, posts: [] },
    popular: { loading: false, error: null, posts: [] },
  },
  reducers: {
    // for recents posts
    fetchRecentPosts(state, _) {
      state.recents.loading = true;
    },
    fetchRecentPostsSuccess(state, action) {
      state.recents.loading = false;
      state.recents.posts = action.payload;
    },
    fetchRecentPostsFailed(state, action) {
      state.recents.loading = false;
      state.recents.error = action.payload;
    },

    // for friends posts
    fetchFriendsPosts(state, _) {
      state.friends.loading = true;
    },
    fetchFriendsPostsSuccess(state, action) {
      state.friends.loading = false;
      state.friends.posts = action.payload;
    },
    fetchFriendsPostsFailed(state, action) {
      state.friends.loading = false;
      state.friends.error = action.payload;
    },

    // for popular posts
    fetchPopularPosts(state, _) {
      state.popular.loading = true;
    },
    fetchPopularPostsSuccess(state, action) {
      state.popular.loading = false;
      state.popular.posts = action.payload;
    },
    fetchPopularPostsFailed(state, action) {
      state.popular.loading = false;
      state.popular.error = action.payload;
    },

    // toggle post like
    toggleFeedPostLike(state, action) {
      const { feedType, postID } = action.payload;
      // find index of the post
      const index = state[feedType]?.findIndex((post) => post.id === postID);
      // update the post state liked: true
      state[feedType][index].liked = !state[feedType][index].liked;
    },
    toggleFeedPostLikeFailed(state, action) {
      const { feedType, postID } = action.payload;
      // find index of the post
      const index = state[feedType]?.findIndex((post) => post.id === postID);
      // reverse the state the previouse
      state[feedType][index].liked = !state[feedType][index].liked;
    },
  },
});

export const {
  fetchRecentPosts,
  fetchRecentPostsSuccess,
  fetchRecentPostsFailed,
  fetchFriendsPosts,
  fetchFriendsPostsSuccess,
  fetchFriendsPostsFailed,
  fetchPopularPosts,
  fetchPopularPostsSuccess,
  fetchPopularPostsFailed,
  toggleFeedPostLike,
  toggleFeedPostLikeFailed,
} = postsSlice.actions;
export default postsSlice.reducer;
