import React from "react";

import TableColumn from "../../types/TableColumn";
import RecordVariance from "../../components/RecordVariance/RecordVariance";

const selectLocalAuthorityColumns = (): Array<TableColumn> => [
  {
    title: "Local Authorities",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Daily Cases",
    dataIndex: "dailyCases",
    align: "right",
    render: (text, { changeInDailyCases }) => {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <RecordVariance record={changeInDailyCases} />
            <div> {text}</div>
          </div>
        </>
      );
    },
  },
  {
    title: "Total Cases",
    dataIndex: "totalCases",
    align: "right",
  },
];

export default selectLocalAuthorityColumns;
