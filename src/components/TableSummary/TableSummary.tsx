import React from "react";
import { Table, Typography } from "antd";

import "./TableSummary.css";

const { Text } = Typography;

type TableSummaryProps = {
  name: string;
  colSpan?: number;
  rows: Array<number>;
};

const TableSummary = (props: TableSummaryProps) => {
  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} key={0} colSpan={props.colSpan}>
          {props.name}
        </Table.Summary.Cell>

        {props.rows.map((row, index) => (
          <Table.Summary.Cell
            index={index + 1}
            key={index + 1}
            className="cell-align"
          >
            <Text type="danger">{row}</Text>
          </Table.Summary.Cell>
        ))}
      </Table.Summary.Row>
    </>
  );
};

TableSummary.defaultProps = {
  colSpan: 0,
};

export default TableSummary;
