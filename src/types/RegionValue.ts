import DailyRecord from "./DailyRecord";

type RegionValue = {
  dailyConfirmedCases: Array<DailyRecord>;
  dailyTotalConfirmedCases: Array<DailyRecord>;
  name: { value: string };
  totalCases: { value: number };
};

export default RegionValue;
