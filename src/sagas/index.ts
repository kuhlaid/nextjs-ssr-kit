import { all, call } from "redux-saga/effects";
import userSagas from "./Users";
import tagSagas from "./Tags";
import { SagaIterator } from "~types";

function* rootSaga(): SagaIterator {
  yield all([call(userSagas), call(tagSagas)]);
}

export default rootSaga;
