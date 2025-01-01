import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import RadarChartComponent from "../../components/ChartsComponents/RadarChartComponent";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QuestionnareResultPage = ({ totalScore }) => {
  const location = useLocation();
  const { expertData = {} } = location.state || {};
  console.log(expertData);
  const user_id = expertData.user_id;
  const [normalizedScores, setNormalizedScores] = useState({
    problemSolving: 0,
    decisionMaking: 0,
    creativity: 0,
    analyticalDepth: 0,
    collaboration: 0,
  });

  // Define max values for each category
  const maxValues = {
    problemSolving: 9,
    collaboration: 3,
    decisionMaking: 7.5,
    creativity: 4.5,
    analyticalDepth: 6,
  };

  useEffect(() => {
    // Normalize scores when totalScore changes
    // out of 25 k scale mei percentage
    const normalized = {
      problemSolving:
        (totalScore["Problem Solving"] / 25) * maxValues.problemSolving,
      collaboration:
        (totalScore["Collaborative Thinking"] / 25) * maxValues.collaboration,
      decisionMaking:
        (totalScore["Decision Making"] / 25) * maxValues.decisionMaking,
      creativity: (totalScore["Creative Thinking"] / 25) * maxValues.creativity,
      analyticalDepth:
        (totalScore["Analytical Depth"] / 25) * maxValues.analyticalDepth,
    };

    // console.log(normalized);

    // marks in percentage
    const perce = {
      problemSolving: normalized.problemSolving / maxValues.problemSolving,
      collaboration: normalized.collaboration / maxValues.collaboration,
      decisionMaking: normalized.decisionMaking / maxValues.decisionMaking,
      creativity: normalized.creativity / maxValues.creativity,
      analyticalDepth: normalized.analyticalDepth / maxValues.analyticalDepth,
    };
    setNormalizedScores(normalized);

    // marks in scale of 10
    const scores = {
      problemSolving: perce.problemSolving * 10,
      collaboration: perce.collaboration * 10,
      decisionMaking: perce.decisionMaking * 10,
      creativity: perce.creativity * 10,
      analyticalDepth: perce.analyticalDepth * 10,
    };
    console.log("Scores: ", scores);
    const setScores = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/scoreUpdate",
          scores, // This is the request body
          { params: { id: user_id } } // Configuration object with query parameters
        );
      } catch (error) {
        console.error(error);
      }
    };
    setScores();
    // Set the normalized scores state
  }, [totalScore]);

  return (
    <main className="h-screen bg-[#eee] flex justify-center items-center">
      <div className="w-[65%] px-3 py-6 bg-white rounded-lg shadow-sm flex flex-col gap-y-12">
        <h1 className="text-center font-semibold text-3xl text-[#333]">
          Your Result
        </h1>
        <Grid container spacing={2} columns={16}>
          <Grid
            size={10}
            sx={{ borderRight: "1px solid #f4f4f4", borderRadius: "10px" }}
          >
            {/* Mount the radar graph with normalized scores */}
            <RadarChartComponent data={normalizedScores} />
            <h1 className="mt-8 text-center text-2xl font-semibold">
              <span
                className="px-5 py-4 border border-[#f4f4f4] rounded-md"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
              >
                <span className="text-[#0E8CCA]">Total Score: </span>
                {totalScore["Problem Solving"] +
                  totalScore["Collaborative Thinking"] +
                  totalScore["Decision Making"] +
                  totalScore["Creative Thinking"] +
                  totalScore["Analytical Depth"]}{" "}
                / {25 * 5}
              </span>
            </h1>
          </Grid>
          <Grid size={6}>
            {/* Additional content or styling can go here */}
            <h2 className="text-[#0e8cca] font-medium text-lg">
              Score Breakdown
            </h2>
            <div className="flex flex-col gap-y-6 mt-6">
              <span
                className="flex items-center justify-between bg-[#f9f9f9] px-5 py-3 rounded-md mx-3"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
              >
                <p className="font-medium">Problem solving:</p>
                <p>{totalScore["Problem Solving"]} / 25</p>
              </span>
              <span
                className="flex items-center justify-between bg-[#f9f9f9] px-5 py-3 rounded-md mx-3"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
              >
                <p className="font-medium">Collaborative Thinking:</p>
                <p>{totalScore["Collaborative Thinking"]} / 25</p>
              </span>
              <span
                className="flex items-center justify-between bg-[#f9f9f9] px-5 py-3 rounded-md mx-3"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
              >
                <p className="font-medium">Decision Making:</p>
                <p>{totalScore["Decision Making"]} / 25</p>
              </span>
              <span
                className="flex items-center justify-between bg-[#f9f9f9] px-5 py-3 rounded-md mx-3"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
              >
                <p className="font-medium">Creative Thinking:</p>
                <p>{totalScore["Creative Thinking"]} / 25</p>
              </span>
              <span
                className="flex items-center justify-between bg-[#f9f9f9] px-5 py-3 rounded-md mx-3"
                style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
              >
                <p className="font-medium">Analytical Depth:</p>
                <p>{totalScore["Analytical Depth"]} / 25</p>
              </span>
            </div>

            <button className="mt-6 w-full font-normal text-[#0e8cca]">
              Go back to dashboard
            </button>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default QuestionnareResultPage;