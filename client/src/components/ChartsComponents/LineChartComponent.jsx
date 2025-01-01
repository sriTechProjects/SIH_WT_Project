import React, { useRef, useEffect } from "react";
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
  layouts,
} from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Register necessary components for chart
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

const LineChartComponent = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const chartRef = useRef(null);

  // Dummy data for expert's performance
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dataValues = [5, 7, 6, 8, 9, 11, 14, 15, 12, 13, 14, 16]; // Example performance data

  // Chart data configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Expert Performance",
        data: dataValues,
        fill: true, // Enable gradient fill under the line
        backgroundColor: (context) =>
          createGradient(context, context.chart.chartArea),
        borderColor: "#16C6F6", // Line stroke color
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#16C6F6", // Points color
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  // Gradient for the area under the curve
  const createGradient = (context, chartArea) => {
    const { ctx } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "#12CDF7"); // Top color
    gradient.addColorStop(0.5, "#AED8ED"); // Middle color
    gradient.addColorStop(1, "#FFFFFF"); // Bottom color
    return gradient;
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure chart uses container height
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Performance: ${context.raw}`,
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
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="flex items-center justify-between ">
        <h2 className="font-semibold text-lg">Expert Performance over year</h2>
        {/* Dropdown */}
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">
            Department
          </InputLabel>
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
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
