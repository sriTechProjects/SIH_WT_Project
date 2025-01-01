import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartComponent2 = ({data}) => {
  // Maximum values for each category
  const maxValues = {
    problemSolving: 25,
    collaboration: 25,
    decisionMaking: 25,
    creativity: 25,
    analyticalDepth: 25,
  };

  // Normalize data (convert to percentage)
  const normalizedData = {
    problemSolving: (data["problemSolving"] / maxValues.problemSolving) * 100,
    collaboration: (data["collaboration"] / maxValues.collaboration) * 100,
    decisionMaking: (data["decisionMaking"] / maxValues.decisionMaking) * 100,
    creativity: (data["creativity"] / maxValues.creativity) * 100,
    analyticalDepth: (data["analyticalDepth"] / maxValues.analyticalDepth) * 100,
  };

  // Chart data configuration
  const chartData = {
    labels: [
      "Problem Solving",
      "Collaboration",
      "Decision Making",
      "Creativity",
      "Analytical Depth",
    ],
    datasets: [
      {
        label: "Approach Relevancy (%)",
        data: [
          normalizedData.problemSolving,
          normalizedData.collaboration,
          normalizedData.decisionMaking,
          normalizedData.creativity,
          normalizedData.analyticalDepth,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Light blue
        borderColor: "rgba(59, 130, 246, 1)", // Blue border
        pointBackgroundColor: "rgba(59, 130, 246, 1)", // Blue points
        borderWidth: 2,
      },
    ],
  };

  // Chart display options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "#6B7280",
        },
        grid: {
          color: "#E5E7EB",
        },
        angleLines: {
          color: "#E5E7EB",
        },
        pointLabels: {
          color: "#374151",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return` ${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="relative h-[50%]">
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
}

export default RadarChartComponent2;