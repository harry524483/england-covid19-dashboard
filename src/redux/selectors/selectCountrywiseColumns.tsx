import React from "react";
import { Link } from "react-router-dom";
import RecordVariance from "../../components/RecordVariance/RecordVariance";

import TableColumn from "../../types/TableColumn";
import Country from "../../constants/Country";

const selectCountrywiseColumns = (): Array<TableColumn> => {
  return [
    {
      title: "Country",
      dataIndex: "name",
      render: (text) =>
        text === Country.England ? (
          <Link to="/region">
            <strong>{text}</strong>
          </Link>
        ) : (
          <strong>{text}</strong>
        ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Daily Deaths",
      dataIndex: "dailyDeaths",
      align: "right",
      render: (text, { changeInDailyDeaths }) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <RecordVariance record={changeInDailyDeaths} />
              <div> {text}</div>
            </div>
          </>
        );
      },
    },
    {
      title: "Total Deaths",
      dataIndex: "totalDeaths",
      align: "right",
    },
  ];
};

export default selectCountrywiseColumns;
