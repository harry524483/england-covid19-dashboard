import { call, put } from "redux-saga/effects";

import Action from "../../types/Action";
import {
  FETCH_LOCAL_AUTHORITY_DATE,
  FETCH_LOCAL_AUTHORITY_RECORDS_SUCCESS,
  FETCH_LOCAL_AUTHORITY_RECORDS_ERROR,
  FILTER_LOCAL_AUTHORITY_BY_REGION,
} from "../actionTypes";
import getLocalAuthorityRecords from "../../service/getLocalAuthorityRecords";

function* fetchLocalAuthorityRecordsSaga({ payload }: Action) {
  try {
    const data = yield call(getLocalAuthorityRecords);

    yield put({ type: FETCH_LOCAL_AUTHORITY_RECORDS_SUCCESS, payload: data });
    yield put({ type: FILTER_LOCAL_AUTHORITY_BY_REGION, payload });
    yield put({ type: FETCH_LOCAL_AUTHORITY_DATE });
  } catch (error) {
    yield put({ type: FETCH_LOCAL_AUTHORITY_RECORDS_ERROR });
  }
}

export default fetchLocalAuthorityRecordsSaga;
