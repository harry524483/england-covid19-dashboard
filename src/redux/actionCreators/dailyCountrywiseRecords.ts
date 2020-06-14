import { DAILY_COUNTRYWISE_RECORDS } from "../actionTypes";

const dailyCountrywiseRecords = (date: string) => ({
  type: DAILY_COUNTRYWISE_RECORDS,
  payload: date,
});

export default dailyCountrywiseRecords;
