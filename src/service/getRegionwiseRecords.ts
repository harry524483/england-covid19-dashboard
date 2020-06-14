import axios from "axios";

const getRegionwiseRecords = async () => {
  const response = await axios.get(
    "https://c19downloads.azureedge.net/downloads/data/regions_latest.json"
  );

  return response.data;
};

export default getRegionwiseRecords;
