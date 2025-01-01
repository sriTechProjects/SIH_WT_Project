import React, { useContext, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import RacHeader from "./RacHeader";
import PanelCards from "./PanelCards";
import "../../styles/RacHeadStyle.css";
import axios from "axios";
import { FetchListedJobs } from "../../context/RacHeadContexts/FetchListedJobs";
import JobsCards from "./JobsCards";
import no_panels_found from '../../assets/images/drdo-logo.svg'

const RacHeadPannels = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const params = useParams();
  const jobID = params.jobId;
  const [panels, setPanels] = useState([]);
  const fetchPanels = async () => {
    const panels = await axios.get(`${base_url}/api/panel/job/${jobID}`, {
      withCredentials: true,
    });
    console.log(panels?.data?.data);
    setPanels(panels?.data?.data);
  };
  useEffect(() => {
    fetchPanels();
  }, [jobID]);
  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="flex px-8 py-4 flex-col w-full gap-y-12 pt-6">
        <RacHeader />
        <div className="main-content flex justify-between items-center">
          <h2 className="font-semibold text-[#464646] text-xl">
            Interview Panels
          </h2>
          <div className="button-grp flex gap-x-3 items-center">
        
            {/* Select Interview Status Filter */}
            <FormControl
              sx={{
                background: "#fff",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "6px",
                minWidth: "220px", // Adjust as per content
              }}
            >
              <InputLabel id="interview-status-select-label">
                Select Interview Status
              </InputLabel>
              <Select
                labelId="interview-status-select-label"
                id="interview-status-select"
                label="Select Interview Status"
                sx={{
                  textAlign: "left",
                }}
              >
                <MenuItem value="applicant">Upcoming</MenuItem>
                <MenuItem value="expert">Inprogress</MenuItem>
                <MenuItem value="expert">Completed</MenuItem>
              </Select>
            </FormControl>

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
                textTransform: "capitalize"
              }}
              onClick={() => {
                navigate(`/rachead/externalPanelList`);
              }}
            >
              Find External Experts
            </Button>

            <Button
              variant="contained"
              sx={{
                padding: "14px 16px", // Adjust padding for better sizing
                fontSize: "0.875rem", // Match MUI typography
                backgroundColor: "#464646",
                "&:hover": {
                  backgroundColor: "#333",
                },
                textTransform: "capitalize"
              }}
              onClick={() => {
                navigate(`/rachead/createPanel/${jobID}`);
              }}
            >
              Create Panel
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
          {
            panels.length > 0 ? (
              panels.map((panel, index) => (
                <PanelCards key={index} panel={panel} />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="flex flex-col gap-y-3 h-[30%] items-center">
                  <img src={no_panels_found} alt="drdo logo" className="h-[100%]"/>
                  <h1 className="font-semibold text-xl">No Pannels formed yet</h1>
                </span>
              </div>
            )
          }
        </div>
      </main>
    </section>
  );
};

export default RacHeadPannels;
