import axios from "axios";

const getLocalAuthorityRecords = async () => {
  const response = await axios.get(
    "https://c19downloads.azureedge.net/downloads/data/ltlas_latest.json"
  );

  return response.data;
};

export default getLocalAuthorityRecords;
