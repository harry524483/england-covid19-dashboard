import { HANDLE_DATE_RANGE_CHANGE } from "../actionTypes";

const handleDateRangeChange = (option: { value: string }) => ({
  type: HANDLE_DATE_RANGE_CHANGE,
  payload: option.value,
});
export default handleDateRangeChange;
