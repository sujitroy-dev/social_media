import { call, put, takeEvery } from "redux-saga/effects";
import { postsApi } from "@/api";
import {
  fetchRecentPosts,
  fetchRecentPostsSuccess,
  fetchRecentPostsFailed,
  fetchFriendsPostsSuccess,
  fetchFriendsPostsFailed,
  fetchFriendsPosts,
  fetchPopularPosts,
  fetchPopularPostsSuccess,
  fetchPopularPostsFailed,
  toggleFeedPostLike,
  toggleFeedPostLikeFailed,
} from "../reducers/postsSlice";

function* fetchRecentPostsSaga() {
  try {
    const post = yield call(postsApi.fetchRecentPosts);
    yield put(fetchRecentPostsSuccess(post));
  } catch (error) {
    yield put(fetchRecentPostsFailed(error.message));
  }
}
function* fetchFriendsPostsSaga() {
  try {
    const post = yield call(postsApi.fetchFriendsPosts);
    yield put(fetchFriendsPostsSuccess(post));
  } catch (error) {
    yield put(fetchFriendsPostsFailed(error.message));
  }
}
function* fetchPopularPostsSaga() {
  try {
    const post = yield call(postsApi.fetchPopularPosts);
    yield put(fetchPopularPostsSuccess(post));
  } catch (error) {
    yield put(fetchPopularPostsFailed(error.message));
  }
}

function* likePostSaga(action) {
  try {
    const { postID } = action.payload;
    const post = yield call(() => postsApi.likePost(postID));
    yield console.log(post);
  } catch (error) {
    yield put(toggleFeedPostLikeFailed(error.message));
  }
}

export function* postsSaga() {
  yield takeEvery(fetchRecentPosts.type, fetchRecentPostsSaga);
  yield takeEvery(fetchFriendsPosts.type, fetchFriendsPostsSaga);
  yield takeEvery(fetchPopularPosts.type, fetchPopularPostsSaga);
  yield takeEvery(toggleFeedPostLike.type, likePostSaga);
}
