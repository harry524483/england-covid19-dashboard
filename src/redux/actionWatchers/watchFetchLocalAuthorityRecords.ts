import { takeLatest } from "redux-saga/effects";
import { FETCH_LOCAL_AUTHORITY_RECORDS } from "../actionTypes";
import fetchLocalAuthorityRecordsSaga from "../actionCreators/fetchLocalAuthorityRecordsSaga";

function* watchFetchLocalAuthorityRecords() {
  yield takeLatest(
    FETCH_LOCAL_AUTHORITY_RECORDS,
    fetchLocalAuthorityRecordsSaga
  );
}

export default watchFetchLocalAuthorityRecords;
