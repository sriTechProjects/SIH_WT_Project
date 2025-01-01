import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const BarChartComponent = () => {
  const roles = ["Role1", "Role2", "Role3", "Role4", "Role5"];
  const relevancy = [87, 56, 90, 34, 66];

  const data = {
    labels: roles,
    datasets: [
      {
        label: "Relevancy Percentage",
        data: relevancy,
        backgroundColor: "rgba(14, 140, 202, 0.36)", // Set the color for bars
        borderColor: "#0E8CCA", // Border color for the bars
        borderWidth: 1,
        borderRadius: 5, // Adds rounded corners to the bars
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
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#4A4A4A",
        },
      },
      tooltip: {
        backgroundColor: "rgba(14, 140, 202, 0.36)", // Slightly modified background color
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (context) => ` ${context.raw}%`, // Display y-values with % symbol
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.1)", // Light horizontal gridlines
        },
        ticks: {
          color: "#4A4A4A",
          font: {
            size: 13,
            family: "'Roboto', sans-serif",
          },
        },
        border: {
          color: "#CCCCCC",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.1)", // Light vertical gridlines
        },
        ticks: {
          color: "#4A4A4A",
          font: {
            size: 13,
            family: "'Roboto', sans-serif",
          },
          stepSize: 10,
          max: 100, // Since percentages are out of 100
        },
        border: {
          color: "#CCCCCC",
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuart", // Smooth easing animation
    },
  };

  return (
    <div style={{ width: "90%", margin: "auto", height: "70%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
