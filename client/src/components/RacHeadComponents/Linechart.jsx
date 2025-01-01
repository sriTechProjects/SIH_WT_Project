import React, { useRef } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const Linechart = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const chartRef = useRef(null);

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
  const dataValues = [5, 7, 6, 8, 9, 11, 14, 15, 12, 13, 14, 16];

  const createGradient = (context, chartArea) => {
    const { ctx } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "#12CDF7");
    gradient.addColorStop(0.5, "#AED8ED");
    gradient.addColorStop(1, "#FFFFFF");
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Expert Performance",
        data: dataValues,
        fill: true,
        backgroundColor: (context) =>
          createGradient(context, context.chart.chartArea),
        borderColor: "#16C6F6",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#16C6F6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Performance: ${context.raw}`,
        },
      },
    },
    layout: {
      padding: {
        bottom: 20,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex gap-6 items-center justify-between m-4">
        <h2 className="font-semibold text-lg">Expert Performance Over Year</h2>
        <div className="">
          <FormControl
            sx={{
              marginTop: 1,
              minWidth: 160,
              background: "transparent",
            }}
            size="small"
          >
            <InputLabel id="demo-select-small-label" sx={{ color: "#646464" }}>
              Select Expert
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
          <FormControl
            sx={{
              m: 1,
              minWidth: 160,
              background: "transparent",
            }}
            size="small"
          >
            <InputLabel id="demo-select-small-label" sx={{ color: "#646464" }}>
              Select Year
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Select Year"
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
      </div>
      <div style={{ flexGrow: 1, margin: "1rem" }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default Linechart;
