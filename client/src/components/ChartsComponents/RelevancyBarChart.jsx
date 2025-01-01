import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  layouts,
} from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RelevancyBarChart = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // Dummy data for the chart
  const labels = ["IT", "HR", "Marketing", "Finance", "Engineering"];
  const dataValues = [85, 70, 65, 90, 75]; // Example relevancy percentages

  // Create a gradient for the bars
  const createGradient = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null; // Ensure the chart area is defined

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "#2AFADF"); // Top color
    gradient.addColorStop(1, "#4C83FF"); // Bottom color
    return gradient;
  };

  // Chart data configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Relevancy Percentage",
        data: dataValues,
        backgroundColor: (context) => createGradient(context),
        borderWidth: 1,
        borderRadius: 5, // Curve the edges of the bars
        barPercentage: 0.6, // Width of bars as a percentage
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`, // Show percentage values in tooltip
        },
      },
    },
    layout: {
      padding: {
        bottom: 20, // Add padding to ensure labels don't overflow
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove gridlines on the x-axis
        },
        ticks: {
          font: { size: 12 },
          color: "#666",
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Set max value for percentages
        ticks: {
          stepSize: 20, // Interval of 10%
          font: { size: 12 },
          color: "#666",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Subtle gridlines for y-axis
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="flex items-center justify-between ">
        <h2 className="font-semibold text-lg">Relevancy Chart</h2>
        {/* Dropdown */}
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleChange}
            autoWidth
            label="Department"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={10}>IT</MenuItem>
            <MenuItem value={20}>HR</MenuItem>
            <MenuItem value={30}>Finance</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RelevancyBarChart;