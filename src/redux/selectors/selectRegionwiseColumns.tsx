import React from "react";
import { Link } from "react-router-dom";

import TableColumn from "../../types/TableColumn";
import RecordVariance from "../../components/RecordVariance/RecordVariance";

const selectRegionwiseColumns = (): Array<TableColumn> => [
  {
    title: "Region",
    dataIndex: "name",
    render: (text: string) => (
      <Link to={`/region/${text}`}>
        <strong>{text}</strong>
      </Link>
    ),
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

export default selectRegionwiseColumns;
