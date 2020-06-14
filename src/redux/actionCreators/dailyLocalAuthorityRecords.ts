import { DAILY_LOCAL_AUTHORITY_RECORDS } from "../actionTypes";

const dailyLocalAuthorityRecords = (date: string) => ({
  type: DAILY_LOCAL_AUTHORITY_RECORDS,
  payload: date,
});

export default dailyLocalAuthorityRecords;
