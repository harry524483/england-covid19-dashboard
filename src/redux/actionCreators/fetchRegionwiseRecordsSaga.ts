import { call, put } from "redux-saga/effects";

import {
  FETCH_REGIONWISE_RECORDS_SUCCESS,
  FETCH_REGIONWISE_RECORDS_ERROR,
  FETCH_REGIONWISE_DATE,
} from "../actionTypes";
import getRegionwiseRecords from "../../service/getRegionwiseRecords";

function* fetchRegionwiseRecordsSaga() {
  try {
    const data = yield call(getRegionwiseRecords);

    yield put({ type: FETCH_REGIONWISE_RECORDS_SUCCESS, payload: data });
    yield put({ type: FETCH_REGIONWISE_DATE });
  } catch (error) {
    console.log(error);
    yield put({ type: FETCH_REGIONWISE_RECORDS_ERROR });
  }
}

export default fetchRegionwiseRecordsSaga;
