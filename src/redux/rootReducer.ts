import { combineReducers } from "redux";

import countrywise from "./reducers/countrywise";
import regionwise from "./reducers/regionwise";
import localAuthority from "./reducers/localAuthority";

const rootReducer = combineReducers({
  countrywise,
  regionwise,
  localAuthority,
});

export default rootReducer;
