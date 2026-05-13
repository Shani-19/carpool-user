"use client";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  // Information about the dataset
  datasets: [
    {
      label: "Views",
      backgroundColor: "transparent",
      borderColor: "#1967D2",
      borderWidth: "1",
      data: [196, 132, 215, 362, 210, 252],
      pointRadius: 3,
      pointHoverRadius: 3,
      pointHitRadius: 10,
      pointBackgroundColor: "#1967D2",
      pointHoverBackgroundColor: "#1967D2",
      pointBorderWidth: "2",
      tension: 0.4,
    },
  ],
};

const options = {
  layout: {
    padding: 10,
  },

  legend: {
    display: false,
  },
  title: {
    display: false,
  },

  scales: {},

  tooltips: {
    backgroundColor: "#333",
    titleFontSize: 13,
    titleFontColor: "#fff",
    bodyFontColor: "#fff",
    bodyFontSize: 13,
    displayColors: false,
    xPadding: 10,
    yPadding: 10,
    intersect: false,
  },
};
const EarningsChart = () => {
  return <Line data={data} options={options} />;
};

export default EarningsChart;
