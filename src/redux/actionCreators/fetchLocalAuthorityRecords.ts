import { FETCH_LOCAL_AUTHORITY_RECORDS } from "../actionTypes";

const fetchLocalAuthorityRecords = (regionName: string) => ({
  type: FETCH_LOCAL_AUTHORITY_RECORDS,
  payload: regionName,
});

export default fetchLocalAuthorityRecords;
