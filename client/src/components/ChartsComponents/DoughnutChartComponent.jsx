  import React, { useRef, useEffect } from "react";
  import { Doughnut } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";

  // Register necessary components
  ChartJS.register(ArcElement, Tooltip, Legend);

  const DoughnutChatComponent = () => {
    const chartRef = useRef(null);

    const dataValues = [35, 45, 20]; // In Progress, Completed, Upcoming
    const labels = ["In Progress", "Completed", "Upcoming"];

    const data = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ["#000", "#000", "#000"], // Temporary placeholders
          hoverOffset: 0, // Remove hover effect
          borderRadius: 10,
          borderWidth: 8,
        },
      ],
    };

    const options = {
      responsive: true,
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
            label: (context) => ` ${context.label}: ${context.raw}%`,
          },
        },
      },
      interaction: {
        mode: 'nearest', // Disable hover background highlight
        intersect: false, // Disable hover highlight when not intersecting
      },
      cutout: "60%", // Creates the donut effect
    };

    // Add gradients dynamically on chart render
    useEffect(() => {
      const chart = chartRef.current;
      if (!chart) return;

      const dataset = chart.data.datasets[0];
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;

      // Create gradients
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

        // Assign gradients to dataset
        dataset.backgroundColor = [
          inProgressGradient,
          completedGradient,
          upcomingGradient,
        ];

        // Update chart to reflect gradients
        chart.update();
      }
    }, []);

    return (
      <div style={{ width: "68%", margin: "auto", height: "80%" }}>
        {/* <h2 className="font-semibold m-2 pt-2">Interview Panel Status Distribution</h2> */}
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>
    );
  };

  export default DoughnutChatComponent;
