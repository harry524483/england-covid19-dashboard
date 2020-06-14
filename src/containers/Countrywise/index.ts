import { connect } from "react-redux";

import Countrywise from "./Countrywise";
import State from "../../types/State";
import selectDataGridColumns from "../../redux/selectors/selectCountrywiseColumns";
import fetchCountrywiseRecords from "../../redux/actionCreators/fetchCountrywiseRecords";
import dailyCountrywiseRecords from "../../redux/actionCreators/dailyCountrywiseRecords";
import handleDateRangeChange from "../../redux/actionCreators/handleDateRangeChange";
import selectChartLabelsAndData from "../../redux/selectors/selectChartLabelsAndData";

const mapStateToProps = ({ countrywise }: State) => {
  return {
    dailyRecords: countrywise.dailyRecords,
    loading: countrywise.loading,
    columns: selectDataGridColumns(),
    recordDates: countrywise.recordDates,
    chartLabelsAndData: selectChartLabelsAndData(countrywise),
    overview: countrywise.overview,
  };
};

const mapDispatchToProps = {
  fetchCountrywiseRecords,
  dailyCountrywiseRecords,
  handleDateRangeChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Countrywise);
