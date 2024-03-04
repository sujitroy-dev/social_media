import { all } from "redux-saga/effects";
import { watchUser } from "./userSaga";

export default function* rootSaga() {
  yield all([watchUser()]);
}
