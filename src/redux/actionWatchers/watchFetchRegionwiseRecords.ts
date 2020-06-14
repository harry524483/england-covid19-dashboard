import { takeLatest } from "redux-saga/effects";
import { FETCH_REGIONWISE_RECORDS } from "../actionTypes";
import fetchRegionwiseRecordsSaga from "../actionCreators/fetchRegionwiseRecordsSaga";

function* watchFetchRegionwiseRecords() {
  yield takeLatest(FETCH_REGIONWISE_RECORDS, fetchRegionwiseRecordsSaga);
}

export default watchFetchRegionwiseRecords;
