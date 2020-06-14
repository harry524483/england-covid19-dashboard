import moment from "moment";

import {
  FETCH_COUNTRYWISE_RECORDS_SUCCESS,
  DAILY_COUNTRYWISE_RECORDS,
  FETCH_COUNTRYWISE_DATE,
  FETCH_LANDING_RECORDS_SUCCESS,
  HANDLE_DATE_RANGE_CHANGE,
} from "../actionTypes";
import CountrywiseState from "../../types/CountrywiseState";
import CountryValue from "../../types/CountryValue";
import Action from "../../types/Action";
import DailyCountryValue from "../../types/DailyCountryValue";
import DailyRecord from "../../types/DailyRecord";
import getDate from "../../utils/getDate";
import Country from "../../constants/Country";
import DateRange from "../../constants/DateRange";

const initialState: CountrywiseState = {
  allRecords: [],
  loading: true,
  dailyRecords: [],
  recordDates: [],
  dailyConfirmedCases: [],
  filteredDailyConfirmedCases: [],
  overview: { totalCases: 0, newCases: 0, totalDeaths: 0, dailyDeaths: 0 },
};

const getDailyRecord = (dailyRecords: Array<DailyRecord>, date: string) => {
  const totalCases = dailyRecords.find(
    (dailyReecord) => dailyReecord.date === date
  );

  return totalCases ? totalCases.value : 0;
};

const countrywise = (state = initialState, { type, payload }: Action) => {
  if (type === FETCH_COUNTRYWISE_RECORDS_SUCCESS) {
    const countryValues: Array<CountryValue> = Object.values(payload);

    const filteredCountryValues: Array<CountryValue> = countryValues.filter(
      (countryValue) => countryValue.hasOwnProperty("name")
    );

    return { ...state, allRecords: filteredCountryValues };
  }

  if (type === FETCH_COUNTRYWISE_DATE) {
    const allRecords: Array<CountryValue> = { ...state.allRecords };
    const firstRecord = allRecords[0];

    const recordDates = firstRecord.dailyTotalDeaths
      .map(({ date }) => date)
      .reverse();

    return { ...state, recordDates };
  }

  if (type === FETCH_LANDING_RECORDS_SUCCESS) {
    const englandRecords = Object.values(payload.countries).find(
      (country: any) => country.name.value === Country.England
    ) as any;

    const { newCases, totalCases, deaths, latestDeaths } = Object.values(
      payload.overview
    )[0] as any;

    return {
      ...state,
      dailyConfirmedCases: englandRecords.dailyConfirmedCases,
      loading: false,
      overview: {
        ...state.overview,
        newCases: newCases.value,
        totalCases: totalCases.value,
        totalDeaths: deaths.value,
        dailyDeaths: latestDeaths.value,
      },
    };
  }

  if (type === DAILY_COUNTRYWISE_RECORDS) {
    const date = payload;
    const countrywiseState = { ...state };

    const dailyCountryValues: Array<DailyCountryValue> = countrywiseState.allRecords
      .map(({ name, totalCases, dailyDeaths, dailyTotalDeaths }, index) => ({
        key: index,
        name: name.value,
        date,
        dailyDeaths: getDailyRecord(dailyDeaths, date),
        totalDeaths: getDailyRecord(dailyTotalDeaths, date),
        totalCases: totalCases.value,
        changeInDailyDeaths:
          getDailyRecord(dailyDeaths, date) -
          getDailyRecord(
            dailyDeaths,
            getDate({ date: new Date(date), dayOffset: -1 })
          ),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return { ...state, dailyRecords: dailyCountryValues };
  }

  if (type === HANDLE_DATE_RANGE_CHANGE) {
    const dateRange = payload;
    const dailyConfirmedCases = [...state.dailyConfirmedCases];

    let filteredDailyConfirmedCases;
    if (dateRange === DateRange.Beginning) {
      filteredDailyConfirmedCases = dailyConfirmedCases;
    } else if (dateRange === DateRange.OneMonth) {
      const oneMonthOldDate = moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD");
      const currentDate = moment().format("YYYY-MM-DD");

      const oneMonthOldConfirmedCases = dailyConfirmedCases.filter(
        (confirmedCase) =>
          moment(confirmedCase.date).isBetween(oneMonthOldDate, currentDate)
      );

      filteredDailyConfirmedCases = oneMonthOldConfirmedCases;
    } else if (dateRange === DateRange.TwoWeeks) {
      const twoWeeksOldDate = moment()
        .subtract(2, "weeks")
        .format("YYYY-MM-DD");
      const currentDate = moment().format("YYYY-MM-DD");

      const oneMonthOldConfirmedCases = dailyConfirmedCases.filter(
        (confirmedCase) =>
          moment(confirmedCase.date).isBetween(twoWeeksOldDate, currentDate)
      );

      filteredDailyConfirmedCases = oneMonthOldConfirmedCases;
    }

    return {
      ...state,
      filteredDailyConfirmedCases,
    };
  }

  return state;
};

export default countrywise;
