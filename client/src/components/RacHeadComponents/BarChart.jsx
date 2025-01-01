import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const labels = ["IT", "HR", "Marketing", "Finance", "Engineering"];
  const dataValues = [85, 70, 65, 90, 75];

  const createGradient = (context) => {
    if (!context.chart.chartArea) return null;
    const { ctx, chartArea } = context.chart;
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "#2AFADF");
    gradient.addColorStop(1, "#4C83FF");
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Relevancy Percentage",
        data: dataValues,
        backgroundColor: (context) => createGradient(context),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`,
        },
      },
    },
    layout: {
      padding: { bottom: 0 },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#666" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, font: { size: 12 }, color: "#666" },
        grid: { color: "rgba(200, 200, 200, 0.2)" },
      },
    },
    categoryPercentage: 0.9, // Adjust space within categories
    barPercentage: 0.9,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex gap-6 items-center justify-between m-4">
        <h2 className="font-semibold text-lg">Relevancy Chart</h2>
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
            background: "transparent",
          }}
          size="small"
        >
          <InputLabel id="demo-select-small-label" sx={{ color: "#646464" }}>
            Select Department
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Select Department"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
                "&.Mui-focused fieldset": {
                  borderColor: "#646464",
                },
              },
              color: "#646464",
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
