import { call, put } from "redux-saga/effects";

import getCountrywiseRecords from "../../service/getCountrywiseRecords";
import getLandingRecords from "../../service/getLandingRecords";
import {
  FETCH_COUNTRYWISE_RECORDS_SUCCESS,
  FETCH_COUNTRYWISE_RECORDS_ERROR,
  FETCH_COUNTRYWISE_DATE,
  FETCH_LANDING_RECORDS_SUCCESS,
} from "../actionTypes";

function* fetchCountrywiseRecordsSaga() {
  try {
    const data = yield call(getCountrywiseRecords);

    yield put({ type: FETCH_COUNTRYWISE_RECORDS_SUCCESS, payload: data });
    yield put({ type: FETCH_COUNTRYWISE_DATE });

    const landingData = yield call(getLandingRecords);
    yield put({ type: FETCH_LANDING_RECORDS_SUCCESS, payload: landingData });
  } catch (error) {
    yield put({ type: FETCH_COUNTRYWISE_RECORDS_ERROR });
  }
}

export default fetchCountrywiseRecordsSaga;
