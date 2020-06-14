import RegionValue from "./RegionValue";
import DailyRegionValue from "./DailyRegionValue";

type RegionwiseState = {
  allRecords: Array<RegionValue>;
  loading: boolean;
  dailyRecords: Array<DailyRegionValue>;
  recordDates: Array<string>;
};

export default RegionwiseState;
