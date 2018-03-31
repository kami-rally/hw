import React, { Component } from 'react';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  colors: ['#88ceba'],
});

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      divId: `highchart-${this.props.title}`,
    };
    // this.makeHighchart = this.makeHighchart.bind(this);
  }

  componentDidMount() {
    this.makeHighchart();
  }

  makeHighchart() {
    debugger;
    var data = this.props.data;
    var divId = this.state.divId;
    var title = this.props.title;

    var myChart = Highcharts.chart(divId, {
      chart: {
        backgroundColor: '#48485b',
        borderRadius: '5px',
        type: 'spline',
      },
      title: {
        text: title,
        style: { color: '#ff7a50' },
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'date',
          style: { color: '#ff7a50' },
        },

        dateTimeLabelFormats: {
          month: '%e. %b',
          //     year: '%b'
        },

        labels: {
          // style: { color: '#ff7a50' },
        },
      },
      yAxis: {
        gridLineColor: '#afafaf',
        gridLineDashStyle: 'shortdash',
        title: {
          text: title,
          style: { color: '#ff7a50' },
        },

        labels: {
          // style: { color: '#ff7a50' },
        },
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: title,
          data: data,
        },
      ],
    });
  }

  render() {
    return <div id={this.state.divId} />;
  }
}
