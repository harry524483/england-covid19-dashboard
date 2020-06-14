import RegionValue from "./RegionValue";
import DailyRegionValue from "./DailyRegionValue";

type LocalAuthorityState = {
  allRecords: Array<RegionValue>;
  loading: boolean;
  dailyRecords: Array<DailyRegionValue>;
  recordDates: Array<string>;
  recordsByRegion: Array<RegionValue>;
};

export default LocalAuthorityState;
