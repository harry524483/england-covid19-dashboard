import DailyRecord from "./DailyRecord";

type CountryValue = {
  dailyDeaths: Array<DailyRecord>;
  dailyTotalDeaths: Array<DailyRecord>;
  deaths: { value: number };
  name: { value: string };
  totalCases: { value: number };
};

export default CountryValue;
