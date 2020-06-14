import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

type RecordVarianceProps = {
  record: number;
};

const RecordVariance = ({ record }: RecordVarianceProps) => {
  if (record <= 0) {
    return (
      <div style={{ fontSize: "11px", color: "green" }}>
        <ArrowDownOutlined />
        <span>{record}</span>
      </div>
    );
  }
  return (
    <div style={{ fontSize: "11px", color: "red" }}>
      <ArrowUpOutlined />
      <span>{record}</span>
    </div>
  );
};

export default RecordVariance;
