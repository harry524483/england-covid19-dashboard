import CountrywiseState from "./CountrywiseState";
import RegionwiseState from "./RegionwiseState";

type State = {
  countrywise: CountrywiseState;
  regionwise: RegionwiseState;
  localAuthority: RegionwiseState;
};

export default State;
