import { takeLatest } from "redux-saga/effects";
import { FETCH_COUNTRYWISE_RECORDS } from "../actionTypes";
import fetchCountrywiseRecordsSaga from "../actionCreators/fetchCountrywiseRecordsSaga";

function* watchFetchCountrywiseRecords() {
  yield takeLatest(FETCH_COUNTRYWISE_RECORDS, fetchCountrywiseRecordsSaga);
}

export default watchFetchCountrywiseRecords;
