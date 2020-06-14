import React, { Component } from "react";
import { Table, Row, Col, Select, Layout, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import getDate from "../../utils/getDate";
import TableColumn from "../../types/TableColumn";
import DailyRegionValue from "../../types/DailyRegionValue";
import TableSummary from "../../components/TableSummary/TableSummary";

const { Option } = Select;
const { Content, Header, Footer } = Layout;

type LocalAuthorityProps = {
  columns: Array<TableColumn>;
  dailyRecords: Array<DailyRegionValue>;
  fetchLocalAuthorityRecords: (regionName: string) => void;
  dailyLocalAuthorityRecords: (date: string) => void;
  loading: boolean;
  match: { params: { regionName: string } };
  recordDates: Array<string>;
};

type LocalAuthorityState = {
  filteredDailyRecords: Array<DailyRegionValue>;
  localAuthorityName: string;
};

class LocalAuthority extends Component<
  LocalAuthorityProps,
  LocalAuthorityState
> {
  constructor(props: LocalAuthorityProps) {
    super(props);
    this.state = {
      filteredDailyRecords: [],
      localAuthorityName: "",
    };
  }

  componentDidMount() {
    const regionName = this.props.match.params.regionName;
    this.props.fetchLocalAuthorityRecords(regionName);
  }

  componentDidUpdate(prevProps: LocalAuthorityProps) {
    if (prevProps.loading !== this.props.loading) {
      const yesterday = -1;
      const dateString = getDate({ dayOffset: yesterday });
      this.props.dailyLocalAuthorityRecords(dateString);
    }
    if (prevProps.dailyRecords !== this.props.dailyRecords) {
      this.setState({ filteredDailyRecords: this.props.dailyRecords });
    }
  }

  handleLocalAuthoritySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localAuthorityName = event.target.value;
    this.setState(() => {
      const filteredDailyRecords = this.props.dailyRecords.filter(({ name }) =>
        name.toLowerCase().includes(localAuthorityName.toLowerCase())
      );

      return { filteredDailyRecords, localAuthorityName };
    });
  };

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
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ margin: "20px 0px 20px 20px" }}
                onChange={this.props.dailyLocalAuthorityRecords}
                placeholder="Select date"
              >
                {this.props.recordDates.map((date, index) => (
                  <Option value={date} key={index}>
                    {date}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Input
                placeholder="Search local authority"
                style={{ margin: "20px 0px 20px 0px" }}
                suffix={<SearchOutlined />}
                value={this.state.localAuthorityName}
                onChange={this.handleLocalAuthoritySearch}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Table
                size={"small"}
                dataSource={this.state.filteredDailyRecords}
                columns={this.props.columns}
                pagination={false}
                style={{ margin: "0px 0px 0px 20px" }}
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

export default LocalAuthority;
