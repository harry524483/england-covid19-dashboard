import { DAILY_REGIONWISE_RECORDS } from "../actionTypes";

const dailyRegionwiseRecords = (date: string) => ({
  type: DAILY_REGIONWISE_RECORDS,
  payload: date,
});

export default dailyRegionwiseRecords;
