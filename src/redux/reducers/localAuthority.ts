import LocalAuthorityState from "../../types/LocalAuthorityState";
import Action from "../../types/Action";
import {
  FETCH_LOCAL_AUTHORITY_RECORDS_SUCCESS,
  FETCH_LOCAL_AUTHORITY_DATE,
  FILTER_LOCAL_AUTHORITY_BY_REGION,
  DAILY_LOCAL_AUTHORITY_RECORDS,
} from "../actionTypes";
import RegionValue from "../../types/RegionValue";
import regionAndLocalAuthorityMapping from "../../utils/regionAndLocalAuthorityMapping";
import EnglandRegion from "../../constants/EnglandRegion";
import DailyRegionValue from "../../types/DailyRegionValue";
import DailyRecord from "../../types/DailyRecord";
import getDate from "../../utils/getDate";

const initialState: LocalAuthorityState = {
  allRecords: [],
  loading: true,
  dailyRecords: [],
  recordDates: [],
  recordsByRegion: [],
};

const getDailyRecord = (dailyRecords: Array<DailyRecord>, date: string) => {
  const totalCases = dailyRecords.find(
    (dailyReecord) => dailyReecord.date === date
  );

  return totalCases ? totalCases.value : 0;
};

const localAuthority = (
  state: LocalAuthorityState = initialState,
  { type, payload }: Action
) => {
  if (type === FETCH_LOCAL_AUTHORITY_RECORDS_SUCCESS) {
    const values: Array<RegionValue> = Object.values(payload);

    const filteredValues: Array<RegionValue> = values.filter((regionValue) =>
      regionValue.hasOwnProperty("name")
    );

    return { ...state, allRecords: filteredValues, loading: true };
  }

  if (type === FETCH_LOCAL_AUTHORITY_DATE) {
    const recordsByRegion: Array<RegionValue> = { ...state.recordsByRegion };
    const firstRecord = recordsByRegion[0];

    const recordDates = firstRecord.dailyConfirmedCases
      .map(({ date }) => date)
      .reverse();

    return { ...state, recordDates };
  }

  if (type === FILTER_LOCAL_AUTHORITY_BY_REGION) {
    const regionName = payload as EnglandRegion;

    const upperLocalAuthorities = regionAndLocalAuthorityMapping[
      regionName
    ] as Array<string>;

    console.log(upperLocalAuthorities.length);

    const filteredAuthorities = state.allRecords.filter((record) =>
      upperLocalAuthorities.includes(record.name.value)
    );

    console.log(
      "filteredAuthorities",
      filteredAuthorities.map((authority) => authority.name)
    );

    return { ...state, recordsByRegion: filteredAuthorities, loading: false };
  }

  if (type === DAILY_LOCAL_AUTHORITY_RECORDS) {
    const date = payload;
    const localAuthorityState = { ...state };

    const dailyRegionValues: Array<DailyRegionValue> = localAuthorityState.recordsByRegion
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

export default localAuthority;
