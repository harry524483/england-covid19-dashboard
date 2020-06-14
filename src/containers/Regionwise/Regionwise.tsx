import React, { Component } from "react";
import { Table, Row, Col, Select, Layout } from "antd";

import getDate from "../../utils/getDate";
import DailyRegionValue from "../../types/DailyRegionValue";
import TableColumn from "../../types/TableColumn";
import TableSummary from "../../components/TableSummary/TableSummary";

import "antd/dist/antd.css";

const { Option } = Select;
const { Content, Header, Footer } = Layout;

type RegionwiseProps = {
  columns: Array<TableColumn>;
  dailyRecords: Array<DailyRegionValue>;
  dailyRegionwiseRecords: (date: string) => void;
  fetchRegionwiseRecords: Function;
  loading: boolean;
  recordDates: Array<string>;
};

class Regionwise extends Component<RegionwiseProps, {}> {
  componentDidMount() {
    this.props.fetchRegionwiseRecords();
  }

  componentDidUpdate(prevProps: RegionwiseProps) {
    if (prevProps.loading !== this.props.loading) {
      const yesterday = -1;
      const dateString = getDate({ dayOffset: yesterday });
      this.props.dailyRegionwiseRecords(dateString);
    }
  }

  private renderSummary = (tableRows: Array<DailyRegionValue>) => {
    let totalDailyCases = 0;
    let totalCases = 0;

    tableRows.forEach((tableRow) => {
      totalDailyCases = totalDailyCases + tableRow.dailyCases;
      totalCases = totalCases + tableRow.totalCases;
    });

    return (
      <TableSummary
        name="Total"
        colSpan={2}
        rows={[totalDailyCases, totalCases]}
      ></TableSummary>
    );
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <h1 style={{ color: "white" }}>England Covid19 Dashboard</h1>
        </Header>
        <Content>
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ margin: "20px 0px 20px 20px" }}
                onChange={this.props.dailyRegionwiseRecords}
                placeholder="Select date"
              >
                {this.props.recordDates.map((date, index) => (
                  <Option value={date} key={index}>
                    {date}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Table
                size={"small"}
                dataSource={this.props.dailyRecords}
                columns={this.props.columns}
                pagination={false}
                style={{ margin: "0px 20px 20px 20px" }}
                bordered
                loading={this.props.loading}
                summary={this.renderSummary}
              />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Regionwise;
