import React, { useContext, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import PanelCards from "../../components/RacHeadComponents/PanelCards";
import "../../styles/RacHeadStyle.css";
import axios from "axios";
import { FetchListedJobs } from "../../context/RacHeadContexts/FetchListedJobs";
import JobsCards from "../../components/RacHeadComponents/JobsCards";

const RacHeadPannels = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const {
    jobs,
    setJobs,
    loading,
    setLoading,
    role,
    title,
    department,
    description,
  } = useContext(FetchListedJobs);
  console.log(jobs);
  const params = useParams();
  const jobId = params.jobId;
  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="flex px-8 py-4 flex-col w-full gap-y-12 pt-6">
        <RacHeader />
        <div className="main-content flex justify-between items-center">
          <h2 className="font-semibold text-[#464646] text-2xl">
            Created Jobs
          </h2>
          <div className="button-grp flex gap-x-3 items-center">
            {/* Select Department Filter */}
            {/* <FormControl
              sx={{
                background: "#fff",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                minWidth: "180px", // Ensures enough space for content
              }}
            >
              <InputLabel id="role-select-label">Select Department</InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                label="Select Department"
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value="applicant">Applicant</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl> */}


            {/* Button */}
            <Button
              variant="contained"
              sx={{
                padding: "14px 16px", // Adjust padding for better sizing
                fontSize: "0.875rem", // Match MUI typography
                backgroundColor: "#464646",
                "&:hover": {
                  backgroundColor: "#333",
                },
                textTransform:"capitalize"
              }}
              onClick={()=>{navigate('/rachead/jobcreationform')}}
            >
              Create Job
            </Button>
          </div>
        </div>

        {/* pannels card container starts */}
        <div
          className="pannels-container flex flex-wrap gap-y-5 gap-x-5 overflow-y-auto"
          style={{
            height: "calc(100% - 150px)", // Adjust height dynamically
            paddingBottom: "16px",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          {jobs?.map((job, index) => (
            <JobsCards job={job} key={job} />
          ))}
        </div>
      </main>
    </section>
  );
};

export default RacHeadPannels;