import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, tabClasses, TabPanel } from "@mui/joy";
import "../../styles/RacHeadStyle.css";
import ExpertsCard from "../../components/RacHeadComponents/ExpertsCard";
import { border, display, width } from "@mui/system";
import { useParams } from "react-router-dom";
import axios from "axios";
import CandyCard from "../../components/RacHeadComponents/CandyCard";

const GeneratedExpertsPage = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [activeTab, setActiveTab] = useState(0); // Track active tab index
  const params = useParams();
  const panelID = params.panelID;
  const tabPanelStyles = {
    overflow: "hidden",
    height: "530px",
    position: "relative",
  };

  const [panels, setPanels] = useState([]);
  const [candidate, setCandidates] = useState([]);
  const [experts, setExperts] = useState([]);
  const fetchPanelsInfo = async () => {
    const panels = await axios.get(`${base_url}/api/panel/get/${panelID}`, {
      withCredentials: true,
    });
    console.log(panels?.data?.data);
    setPanels(panels?.data?.data);
    setCandidates(panels?.data?.data?.candidates);
    setExperts(panels?.data?.data?.panelInfo?.panelExperts);
  };
  useEffect(() => {
    fetchPanelsInfo();
  }, [panelID]);
  const scrollContainerStyles = {
    overflowY: "scroll", // Enable scrolling
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    paddingRight: "17px", // Prevent content from being cut off due to scrollbar
    marginRight: "-17px", // Hide scrollbar visually
  };

  return (
    <section className="max-h-screen w-screen bg-[#eee] flex items-center justify-center py-8 px-16">
      <div
        className="pannel-container bg-white rounded-lg overflow-hidden flex p-6 max-w-[85.5%] w-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
      >
        <main className="leaderboard-content flex flex-col w-full gap-y-6">
          <h1 className="text-4xl font-semibold text-center">
            Generated Panels
          </h1>
          <Tabs
            aria-label="tabs"
            defaultValue={0}
            value={activeTab}
            onChange={(event, value) => setActiveTab(value)} // Update active tab
            sx={{
              display: "flex", // Align TabList and TabPanels side by side
              flexDirection: "row", // Horizontal alignment
              bgcolor: "transparent",
              height: "100%", // Ensure the tabs take full height
              width: "100%", // Ensure the content spans the available space
              //   border: "2px solid green",
            }}
          >
            {/* TabList - Vertical tabs on the left */}
            <TabList
              disableUnderline
              sx={{
                p: 1.2,
                gap: 2,
                borderRadius: "md",
                bgcolor: "#F6F6F6",
                display: "flex",
                flexDirection: "column", // Stack tabs vertically
                height: "100%", // Take full height of the container
                minWidth: "200px", // Fixed width for TabList
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "#fff", // Active tab background
                  color: "#00b4d8", // Change text color for better visibility
                  fontWeight: "bold", // Optional: Make the active tab text bold
                },
              }}
            >
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                Experts
              </Tab>
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                Candidates
              </Tab>
            </TabList>

            {/* TabPanels - Content on the right */}
            <div
              style={{
                flex: 1, // TabPanel takes remaining space
                padding: "1rem",
              }}
            >
              {activeTab === 0 && (
                <TabPanel value={0} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    {experts.map((expert, index) => (
                      <ExpertsCard key={expert} info={expert} index={index} />
                    ))}
                  </div>
                </TabPanel>
              )}
              {activeTab === 1 && (
                <TabPanel value={1} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    {candidate.map((candi) => (
                      <CandyCard key={candi} info={candi} />
                    ))}
                  </div>
                </TabPanel>
              )}
            </div>
          </Tabs>
        </main>
      </div>
    </section>
  );
};

export default GeneratedExpertsPage;