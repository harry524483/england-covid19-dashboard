import React, { Component } from "react";
import { Table, Row, Col, Select, Layout, Card, Button, Statistic } from "antd";
import Chart from "../../components/Chart/Chart";

import TableColumn from "../../types/TableColumn";

import "antd/dist/antd.css";
import getDate from "../../utils/getDate";
import DailyCountryValue from "../../types/DailyCountryValue";
import TableSummary from "../../components/TableSummary/TableSummary";
import DateRange from "../../constants/DateRange";
const { Option } = Select;
const { Content, Header, Footer } = Layout;

type CountrywiseProps = {
  columns: Array<TableColumn>;
  dailyCountrywiseRecords: (date: string) => void;
  dailyRecords: Array<DailyCountryValue>;
  fetchCountrywiseRecords: Function;
  handleDateRangeChange: (option: any) => void;
  loading: boolean;
  recordDates: Array<string>;
  chartLabelsAndData: { labels: Array<string>; data: Array<number> };
  overview: {
    newCases: number;
    totalCases: number;
    totalDeaths: number;
    dailyDeaths: number;
  };
};

class Countrywise extends Component<CountrywiseProps, {}> {
  componentDidMount() {
    this.props.fetchCountrywiseRecords();
  }

  componentDidUpdate(prevProps: CountrywiseProps) {
    if (prevProps.loading !== this.props.loading) {
      const dateString = getDate({});
      this.props.dailyCountrywiseRecords(dateString);
      this.props.handleDateRangeChange({ value: DateRange.Beginning });
    }
  }

  private renderSummary = (tableRows: Array<DailyCountryValue>) => {
    let totalDailyDeaths = 0;
    let totalDeaths = 0;

    tableRows.forEach((tableRow) => {
      totalDailyDeaths = totalDailyDeaths + tableRow.dailyDeaths;
      totalDeaths = totalDeaths + tableRow.totalDeaths;
    });

    return (
      <TableSummary
        name="Total"
        colSpan={2}
        rows={[totalDailyDeaths, totalDeaths]}
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
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                size="small"
                title="Total number of cases in UK"
                style={{
                  margin: "20px",
                  textAlign: "center",
                }}
                headStyle={{ backgroundColor: "#CFB9B4" }}
              >
                <Statistic value={this.props.overview.totalCases} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                size="small"
                title="Daily cases in UK"
                style={{ margin: "20px", textAlign: "center" }}
                headStyle={{ backgroundColor: "#CFB9B4" }}
              >
                <Statistic value={this.props.overview.newCases} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                size="small"
                title="Daily deaths in UK"
                style={{ margin: "20px", textAlign: "center" }}
                headStyle={{ backgroundColor: "#CFB9B4" }}
              >
                <Statistic value={this.props.overview.dailyDeaths} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
              <Card
                size="small"
                title="Total deaths in UK"
                style={{ margin: "20px", textAlign: "center" }}
                headStyle={{ backgroundColor: "#CFB9B4" }}
              >
                <Statistic value={this.props.overview.totalDeaths} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={this.props.dailyCountrywiseRecords}
                style={{ margin: "0px 0px 20px 20px" }}
                placeholder="Select date"
              >
                {this.props.recordDates.map((date, index) => (
                  <Option value={date} key={index}>
                    {date}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8} offset={8}>
              <Button
                type="dashed"
                value={DateRange.Beginning}
                onClick={(event) =>
                  this.props.handleDateRangeChange(event.currentTarget)
                }
              >
                Beginning
              </Button>
              <Button
                type="dashed"
                value={DateRange.OneMonth}
                onClick={(event) =>
                  this.props.handleDateRangeChange(event.currentTarget)
                }
              >
                1 Month
              </Button>
              <Button
                type="dashed"
                value={DateRange.TwoWeeks}
                onClick={(event) =>
                  this.props.handleDateRangeChange(event.currentTarget)
                }
              >
                2 Weeks
              </Button>
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
                summary={this.renderSummary}
                loading={this.props.loading}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Chart
                type="bar"
                data={{
                  labels: this.props.chartLabelsAndData.labels,
                  datasets: [
                    {
                      label: "Number of confirmed cases in England",
                      data: this.props.chartLabelsAndData.data,
                      backgroundColor: "#8FBC8F",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  layout: {
                    padding: {
                      left: 20,
                      right: 20,
                      top: 0,
                      bottom: 20,
                    },
                  },
                }}
              />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Countrywise;
