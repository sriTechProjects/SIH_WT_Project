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

const StackedBarchart = () => {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const labels = ["IT", "HR", "Marketing", "Finance", "Engineering"];
  const dataValues = [85, 70, 65, 90, 75];
  const middleValues = [60, 50, 55, 80, 65];
  const upperValues = [30, 40, 45, 60, 70];

  const createGradient = (context, color1, color2) => {
    if (!context.chart.chartArea) return null;
    const { ctx, chartArea } = context.chart;
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, color1); // Top color
    gradient.addColorStop(1, color2); // Bottom color
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Bottom Stack",
        data: dataValues,
        backgroundColor: (context) => createGradient(context, "#3C8CE7", "#00EAFF"),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        stack: "stack1",
      },
      {
        label: "Middle Stack",
        data: middleValues,
        backgroundColor: (context) => createGradient(context, "#43CBFF", "#9708CC"),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        stack: "stack2",
      },
      {
        label: "Upper Stack",
        data: upperValues,
        backgroundColor: (context) => createGradient(context, "#C2FFD8", "#465EFB"),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        stack: "stack3",
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
      padding: { bottom: 20 },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#666" },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, font: { size: 12 }, color: "#666" },
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        stacked: true,  // Ensures the stacks are on top of each other
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%",padding:"20px" }}>
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

export default StackedBarchart;