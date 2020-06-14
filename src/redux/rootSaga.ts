import { all } from "redux-saga/effects";

import watchFetchRegionwiseRecords from "./actionWatchers/watchFetchRegionwiseRecords";
import watchFetchCountrywiseRecords from "./actionWatchers/watchFetchCountrywiseRecords";
import watchFetchLocalAuthorityRecords from "./actionWatchers/watchFetchLocalAuthorityRecords";

function* rootSaga() {
  yield all([
    watchFetchCountrywiseRecords(),
    watchFetchRegionwiseRecords(),
    watchFetchLocalAuthorityRecords(),
  ]);
}

export default rootSaga;
