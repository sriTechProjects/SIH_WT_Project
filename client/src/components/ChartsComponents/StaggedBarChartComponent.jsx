import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const StaggedBarChartComponent = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const labels = ['IT', 'HR', 'Marketing', 'Finance', 'Engineering'];
  const screeningData = [40, 40, 30, 20, 20];
  const interviewData = [20, 30, 30, 30, 40];
  const waitingData = [10, 20, 15, 30, 20];

  const screeningGradient = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    gradient.addColorStop(0, '#00EAFF');
    gradient.addColorStop(1, '#3C8CE7');
    return gradient;
  };

  const interviewGradient = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    gradient.addColorStop(0, '#9708CC');
    gradient.addColorStop(1, '#43CBFF');
    return gradient;
  };

  const waitingGradient = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    gradient.addColorStop(0, '#465EFB');
    gradient.addColorStop(1, '#C2FFD8');
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Screening',
        data: screeningData,
        backgroundColor: screeningGradient,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        maxBarThickness: 40,
      },
      {
        label: 'Interview',
        data: interviewData,
        backgroundColor: interviewGradient,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        maxBarThickness: 40,
      },
      {
        label: 'Waiting',
        data: waitingData,
        backgroundColor: waitingGradient,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow dynamic resizing
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    layout: {
      padding: {
        bottom: 40, // Add padding to ensure labels don't overflow
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
          color: "#666",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: { size: 12 },
          color: "#666",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Header Section */}
      <div className="flex items-center justify-between ">
        <h2 className="font-semibold text-lg">Candidate Progress</h2>
        {/* Dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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

      {/* Bar Chart */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default StaggedBarChartComponent;