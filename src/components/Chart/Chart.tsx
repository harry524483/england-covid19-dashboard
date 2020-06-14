import React, { Component } from "react";
import ChartJS from "chart.js";

ChartJS.defaults.scale.gridLines.drawOnChartArea = false;

type ChartProps = {
  type: string;
  data: any;
  options: any;
  width?: string;
  height?: string;
};

class Chart extends Component<ChartProps, {}> {
  private chartRef: any;
  private chartInstance: any;

  constructor(props: ChartProps) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    const { type, data, options } = this.props;
    this.chartInstance = new ChartJS(this.chartRef.current, {
      type,
      data,
      options,
    });
  }

  render() {
    const { width, height } = this.props;
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    return (
      <div>
        <canvas ref={this.chartRef} style={{ width, height }} />
      </div>
    );
  }
}

export default Chart;
