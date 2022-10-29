import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({lineChartData}) {
  return (
    <div>
       <Line data={lineChartData} />
    </div>
  )
}

export default LineChart
