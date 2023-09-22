import React, { Component, } from 'react'
import ReactEcharts from 'echarts-for-react';
import { Row, Col, Select, Button } from 'antd'
import {
  UpCircleOutlined,
  PushpinOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { generatePDF, onMove } from '../../utils';

export class DropConfigChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleLeft: 0,
      styleTop: 0
    }
  }
  getOption() {
    const { dropConfig, chartType } = this.props;
    let legendData = [];
    const xTarget = dropConfig.filter((item) => item.key === 'xAxis')[0].items[0];
    const xData = xTarget ? dropConfig.filter((item) => item.key === 'xAxis')[0].items[0].data : [];
    const yData = dropConfig.filter((item) => item.key === 'yAxis')[0].items.map((ist) => {
      legendData.push(ist.name || '')
      const vdata = { type: ist.chart, color: ist.color, data: ist.data, name: ist.name };
      return vdata
    }
    )

    const option = {
      xAxis: {
        type: 'category',
        data: xData
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        x: 'right',
        data: legendData
      },
      series: yData,
      // dataZoom: [
      //   { type: "inside" }, { type: 'slider' }
      // ],
    };
    return option
  }

  getPieOption() {
    const dropConfig = this.props.dropConfig;
    let legendData = [];
    const target = dropConfig.filter((item) => item.key === 'series')[0];
    const seriesData = target ? target.items.map((ist) => {
      legendData.push(ist.name || '')
      const vdata = { value: ist.value, name: ist.name };
      return vdata
    }
    ) : [];
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        x: 'right',
        data: legendData
      },
      series: [
        {
          type: 'pie',
          data: seriesData
        }
      ],
      // dataZoom: [
      //   { type: "inside" }, { type: 'slider' }
      // ],
    };

    return option;
  }
  setPop = (pop) => {
    this.setState({ pop });
    this.init()
    let myChart = this.echarts && this.echarts.getEchartsInstance();
    console.log("pin change", myChart)
    // myChart && myChart.resize();
  }
  setStyleLeft = (styleLeft) => {
    this.setState({ styleLeft })
  }
  setStyleTop = (styleTop) => {
    this.setState({ styleTop })
  }
  onMouseDown = (e) => {
    this.state.pop && onMove(e, "#move", this.setStyleLeft, this.setStyleTop);
  }
  init = () => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer)
      timer = window.setTimeout(() => {
        let myChart = this.echarts && this.echarts.getEchartsInstance();
        myChart?.resize();
        myChart.clear()
        myChart.setOption(chartType === 'line' ? this.getOption() : this.getPieOption());
        timer = null
      }, 50)
    }
  }
  componentDidMount() {
    let $tar = document.querySelector("#move");
    let w = 0;
    let h = 0;
    var observer = new MutationObserver(function (mutationRecoards, observer) {
      let width = window.getComputedStyle($tar).getPropertyValue("width");
      let height = window.getComputedStyle($tar).getPropertyValue("height");
      if (width == w && height == h) {
        return;
      }
      w = width;
      h = height;

      this.init && this.init()

    });
    observer.observe($tar, {
      attributes: true,
      subtree: true
    })
  }
  downLoad = () => {
    let myChart = this.echarts && this.echarts.getEchartsInstance();
    console.log(myChart)
    //myChart.export();
    generatePDF(myChart);
  }
  render() {
    const { chartType } = this.props
    const { pop, styleTop, styleLeft } = this.state;
    return (
      <div className={`${pop ? "pop" : "pin"}`} id="move" style={{ top: styleTop, left: styleLeft, width: !pop ? "100%" : "800px", height: !pop ? "100%" : "400px" }}>
        <div className='show-icon' onMouseDown={this.onMouseDown} style={{ cursor: pop ? "move" : "poniter" }}>
          {pop ? <PushpinOutlined onClick={() => { this.setPop(false) }} /> : <UpCircleOutlined onClick={() => { this.setPop(true) }} />}
          <Button type="primary" icon={<DownloadOutlined onClick={this.downLoad} />} size="small" />
        </div>

        {chartType === 'line' || chartType === 'bar' ? < ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} ref={(e) => { this.echarts = e; }} /> : ''}
        {chartType === 'pie' ? <ReactEcharts option={this.getPieOption()} notMerge={true} lazyUpdate={true} ref={(e) => { this.echarts = e; }} /> : ''}
      </div>
    )
  }
}

export default DropConfigChart
