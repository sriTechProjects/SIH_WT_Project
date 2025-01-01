import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

const AreaChartComponent = () => {
  // Dummy data
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const dataValues = [2, 3, 5, 4, 7, 6, 8, 9, 10];

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: dataValues,
        fill: true, // Enable gradient fill
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null; // Ensure chart is ready before creating gradient
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(60, 140, 231, 0.5)"); // Top color
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Bottom color

          return gradient;
        },
        borderColor: "#3C8CE7", // Line color
        borderWidth: 2,
        tension: 0.4, // Curve effect for the line
        pointRadius: 3,
        pointBackgroundColor: "#3C8CE7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#666",
        },
      },
      tooltip: {
        backgroundColor: "#3C8CE7",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => ` ${context.raw}`, // Display y-values
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // X-axis grid lines
        },
        ticks: {
          color: "#666",
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Y-axis grid lines
        },
        ticks: {
          color: "#666",
          font: { size: 12 },
        },
      },
    },
    animation: {
      duration: 1500, // Smooth animation duration
      easing: "easeInOutQuad", // Smooth easing
    },
  };

  return (
    <div style={{ width: "90%", margin: "auto", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChartComponent;
