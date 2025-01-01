import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function InterviewStatus() {
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,  
          pointStyle: 'circle',
          font: {
            size: 14
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  const data = {
    datasets: [
      {
        data: [38, 29, 43],
        backgroundColor: ["#0077b6", "#90e0ef", "#caf0f8"],
        hoverBackgroundColor: ["#005f8d", "#48cae4", "#ade8f4"],
      },
    ],
    labels: ["In Progress", "Completed", "Upcoming"],
  };

  return (
    <div className="w-full h-full border-2 pl-5 bg-white pr-5 border-slate-200 shadow-md rounded-2xl">
      <div className="w-full h-full">
        <div className="w-full h-[20%] flex justify-between items-center ">
          <p className="text-xl -tracking-tight font-semibold text-slate-800">
            Interview Status
          </p>
          <button className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700">
            View Report
          </button>
        </div>
        <div className="w-full h-[300px]"> {/* Container with fixed height */}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default InterviewStatus;
