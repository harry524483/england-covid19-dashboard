import { createSelector } from "reselect";
import moment from "moment";

import CountrywiseState from "../../types/CountrywiseState";
import DailyRecord from "../../types/DailyRecord";

const selectDailyConfirmedCases = (stateSlice: CountrywiseState) =>
  stateSlice.filteredDailyConfirmedCases;

const buildChartLabelsAndData = (dailyConfirmedCases: Array<DailyRecord>) => {
  const labels: Array<string> = [];
  const data: Array<number> = [];

  dailyConfirmedCases.forEach(({ date, value }) => {
    labels.push(moment(date).format("DD MMM"));
    data.push(value);
  });

  return { labels, data };
};

export default createSelector(
  [selectDailyConfirmedCases],
  buildChartLabelsAndData
);
