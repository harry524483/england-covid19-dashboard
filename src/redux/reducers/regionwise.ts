import Action from "../../types/Action";
import RegionValue from "../../types/RegionValue";

import {
  FETCH_REGIONWISE_RECORDS_SUCCESS,
  DAILY_REGIONWISE_RECORDS,
  FETCH_REGIONWISE_DATE,
} from "../actionTypes";
import RegionwiseState from "../../types/RegionwiseState";
import DailyRegionValue from "../../types/DailyRegionValue";
import DailyRecord from "../../types/DailyRecord";
import getDate from "../../utils/getDate";

const initialState: RegionwiseState = {
  allRecords: [],
  loading: true,
  dailyRecords: [],
  recordDates: [],
};

const getDailyRecord = (dailyRecords: Array<DailyRecord>, date: string) => {
  const totalCases = dailyRecords.find(
    (dailyReecord) => dailyReecord.date === date
  );

  return totalCases ? totalCases.value : 0;
};

const regionwise = (
  state: RegionwiseState = initialState,
  { type, payload }: Action
) => {
  if (type === FETCH_REGIONWISE_RECORDS_SUCCESS) {
    const regionValues: Array<RegionValue> = Object.values(payload);

    const filteredRegionValues: Array<RegionValue> = regionValues.filter(
      (regionValue) => regionValue.hasOwnProperty("name")
    );

    return { ...state, allRecords: filteredRegionValues, loading: false };
  }

  if (type === FETCH_REGIONWISE_DATE) {
    const allRecords: Array<RegionValue> = { ...state.allRecords };
    const firstRecord = allRecords[0];

    const recordDates = firstRecord.dailyConfirmedCases
      .map(({ date }) => date)
      .reverse();

    return { ...state, recordDates };
  }

  if (type === DAILY_REGIONWISE_RECORDS) {
    const date = payload;
    const regionwiseState = { ...state };

    const dailyRegionValues: Array<DailyRegionValue> = regionwiseState.allRecords
      .map(
        ({ name, dailyConfirmedCases, dailyTotalConfirmedCases }, index) => ({
          key: index,
          name: name.value,
          date,
          dailyCases: getDailyRecord(dailyConfirmedCases, date),
          totalCases: getDailyRecord(dailyTotalConfirmedCases, date),
          changeInDailyCases:
            getDailyRecord(dailyConfirmedCases, date) -
            getDailyRecord(
              dailyConfirmedCases,
              getDate({ date: new Date(date), dayOffset: -1 })
            ),
        })
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    return { ...state, dailyRecords: dailyRegionValues };
  }
  return state;
};

export default regionwise;
