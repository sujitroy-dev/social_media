import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER } from "../actions";
import { fetchUserSuccess } from "../reducers/userSlice";
import { userApi } from "@/api";

function* fetchUserSaga() {
  try {
    const user = yield call(userApi.fetchUser);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    // Handle error
  }
}

export function* watchUser() {
  yield takeEvery(FETCH_USER, fetchUserSaga);
}
