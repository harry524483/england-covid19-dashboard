import { connect } from "react-redux";

import LocalAuthority from "./LocalAuthority";
import State from "../../types/State";
import fetchLocalAuthorityRecords from "../../redux/actionCreators/fetchLocalAuthorityRecords";
import dailyLocalAuthorityRecords from "../../redux/actionCreators/dailyLocalAuthorityRecords";
import selectLocalAuthorityColumns from "../../redux/selectors/selectLocalAuthorityColumns";

const mapStateToProps = ({ localAuthority }: State) => {
  return {
    loading: localAuthority.loading,
    dailyRecords: localAuthority.dailyRecords,
    columns: selectLocalAuthorityColumns(),
    recordDates: localAuthority.recordDates,
  };
};

const mapDispatchToProps = {
  fetchLocalAuthorityRecords,
  dailyLocalAuthorityRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalAuthority);
