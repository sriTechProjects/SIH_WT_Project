import React from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import Grid from "@mui/material/Grid";

import StackedBarchart from "../../components/RacHeadComponents/StackedBarchart";
import Linechart from "../../components/RacHeadComponents/Linechart";
import BarChart from "../../components/RacHeadComponents/Barchart";
import DoughnutChartComponent from "../../components/RacHeadComponents/DoughnutChartComponent";

const RacHeadAnalytics = () => {
  const gridStyle = {
    borderRadius: "10px",
    background: "#fff",
    padding: "1rem", // Padding to add some space inside the white box
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "0.5rem", // Margin around grid items
  };

  const chartContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <section className="h-screen w-screen flex bg-[#f4f4f4] gap-4 overflow-y-auto">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 overflow-y-auto">
        <RacHeader />
        <div className="pannels-container flex flex-grow flex-wrap gap-y-5 gap-x-5 w-full">
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", margin: 0, padding: 0 }}
          >
            {/* Stacked Bar Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <div
                className="p-1 rounded-lg"
                style={{ height: "95%", background: "white" }}
              >
                <StackedBarchart />
              </div>
            </Grid>

            {/* Simple Bar Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <div
                className="p-1 rounded-lg"
                style={{ height: "95%", background: "white", width: "fit" }}
              >
                <BarChart />
              </div>
            </Grid>

            {/* Other charts below */}
            <Grid item xs={12} sm={5} md={5}>
            <div
                className="rounded-lg p-1"
                style={{ height: "90%", background: "white", width: "fit" }}
              >
                <DoughnutChartComponent />
              </div>
            </Grid>

            <Grid item xs={12} sm={7} md={7}>
              <div
                className="rounded-lg p-1"
                style={{ height: "90%", background: "white", width: "fit" }}
              >
                <Linechart />
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadAnalytics;
