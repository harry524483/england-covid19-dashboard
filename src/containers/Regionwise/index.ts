import { connect } from "react-redux";

import Regionwise from "./Regionwise";
import State from "../../types/State";
import fetchRegionwiseRecords from "../../redux/actionCreators/fetchRegionwiseRecords";
import dailyRegionwiseRecords from "../../redux/actionCreators/dailyRegionwiseRecords";
import selectRegionwiseColumns from "../../redux/selectors/selectRegionwiseColumns";

const mapStateToProps = ({ regionwise }: State) => {
  return {
    loading: regionwise.loading,
    dailyRecords: regionwise.dailyRecords,
    columns: selectRegionwiseColumns(),
    recordDates: regionwise.recordDates,
  };
};

const mapDispatchToProps = {
  fetchRegionwiseRecords,
  dailyRegionwiseRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Regionwise);
