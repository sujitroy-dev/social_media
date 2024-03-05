import { all } from "redux-saga/effects";
import { userSaga } from "./userSaga";
import { postsSaga } from "./postsSaga";

export default function* rootSaga() {
  yield all([userSaga(), postsSaga()]);
}
