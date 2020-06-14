import axios from "axios";

const getLandingRecords = async () => {
  const response = await axios.get(
    "https://c19downloads.azureedge.net/downloads/data/landing.json"
  );

  return response.data;
};

export default getLandingRecords;
