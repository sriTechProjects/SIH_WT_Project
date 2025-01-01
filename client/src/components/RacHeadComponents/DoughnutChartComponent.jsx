import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent = () => {
  const chartRef = useRef(null);
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const dataValues = [35, 45, 20]; // In Progress, Completed, Upcoming
  const labels = ["In Progress", "Completed", "Upcoming"];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#000", "#000", "#000"], // Placeholder
        hoverOffset: 0,
        borderRadius: 10,
        borderWidth: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Keeps it in proportion within its container
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    cutout: "60%",
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const dataset = chart.data.datasets[0];
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;

    if (chartArea) {
      const inProgressGradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.top,
        chartArea.right,
        chartArea.bottom
      );
      inProgressGradient.addColorStop(0, "#00EAFF");
      inProgressGradient.addColorStop(1, "#3C8CE7");

      const completedGradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.top,
        chartArea.right,
        chartArea.bottom
      );
      completedGradient.addColorStop(0, "#9708CC");
      completedGradient.addColorStop(1, "#43CBFF");

      const upcomingGradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.top,
        chartArea.right,
        chartArea.bottom
      );
      upcomingGradient.addColorStop(0, "#465EFB");
      upcomingGradient.addColorStop(1, "#C2FFD8");

      dataset.backgroundColor = [
        inProgressGradient,
        completedGradient,
        upcomingGradient,
      ];
      chart.update();
    }
  }, []);

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
        <h2 className="font-semibold text-lg">Interview Panel Status</h2>
        <FormControl
          sx={{
            m: 1,
            minWidth: 160,
            background: "transparent",
          }}
          size="small"
        >
          <InputLabel id="demo-select-small-label" sx={{ color: "#646464" }}>
            Select Month
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Select Month"
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
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChartComponent;
