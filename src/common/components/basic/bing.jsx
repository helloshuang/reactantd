import React from 'react';
//import { ReactChartJs } from 'react-chartjs';


const LineChart = require("react-chartjs").Pie ;


export default class Bing extends React.Component{

  render() {
    const chartData = [
    {
      value: 30,
      color:"#F38630",
      lables:'男',
      highlight: "rgba(220,220,220,0.7)"
    },
    {
      value : 50,
      color : "#E0E4CC",
      lables:'未知',
      highlight: "rgba(169, 3, 41, 0.7)"
    },
    {
      value : 100,
      color : "#69D2E7",
      lables:'女',
      highlight: "rgba(151,187,205,0.8)"
    }
  ];

    return (
      <LineChart
        width={300}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >

      </LineChart>

    );
  }
}

