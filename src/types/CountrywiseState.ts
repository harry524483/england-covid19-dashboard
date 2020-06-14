import CountryValue from "./CountryValue";
import DailyCountryValue from "./DailyCountryValue";
import DailyRecord from "./DailyRecord";

type CountrywiseState = {
  allRecords: Array<CountryValue>;
  loading: boolean;
  dailyRecords: Array<DailyCountryValue>;
  recordDates: Array<string>;
  dailyConfirmedCases: Array<DailyRecord>;
  filteredDailyConfirmedCases: Array<DailyRecord>;
  overview: {
    newCases: number;
    totalCases: number;
    totalDeaths: number;
    dailyDeaths: number;
  };
};

export default CountrywiseState;
