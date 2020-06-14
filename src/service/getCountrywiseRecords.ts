import axios from "axios";

const getCountrywiseRecords = async () => {
  const response = await axios.get(
    "https://c19downloads.azureedge.net/downloads/data/countries_latest.json"
  );

  return response.data;
};

export default getCountrywiseRecords;
