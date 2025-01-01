import React from "react";
import { Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import "chart.js/auto";
import { Box, Typography, Paper, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/joy/CircularProgress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const ReportPage = () => {
  const barChartData = {
    labels: [
      "Technical",
      "Problem Solving",
      "Research",
      "Communication",
      "Leadership",
      "Aptitude",
    ],
    datasets: [
      {
        label: "Scores",
        data: [35, 18, 12, 9, 8, 9],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: [
      "Technical",
      "Problem Solving",
      "Research",
      "Communication",
      "Leadership",
      "Aptitude",
    ],
    datasets: [
      {
        data: [35, 18, 12, 9, 8, 9],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const radarChartData = {
    labels: [
      "Technical",
      "Problem Solving",
      "Research",
      "Communication",
      "Leadership",
      "Aptitude",
    ],
    datasets: [
      {
        label: "Performance Overview",
        data: [35, 18, 12, 9, 8, 9],
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
      },
    ],
  };

  const evaluateData = {
    "Technical Knowledge": {
      "Fundametal Knowledge": [6, 10],
      "Application Knowledge": [7, 10],
      "Current Trends Awareness": [5, 10],
      "Defence Technologies Understanding": [8, 10],
    },
    "Problem Solving": {
      "Problem solving Approach": [7, 10],
      "Logical Reasoning": [4, 5],
      "Ability to solve complex issue": [4, 5],
    },
    "Research & Project Experience": {
      "Quality of Research work": [4, 5],
      "Practical Experience": [3, 5],
      "Hands-on Experience": [4, 5],
    },
    "Communication Skills": {
      "Quality of Speaking": [3, 4],
      "Ability to Explain": [2, 3],
      "Listening Skills": [2, 3],
    },
    "Leadership/Teamwork Abilities": {
      "Collaborative Work": [3, 3],
      "Leadership Potential": [3, 3],
      "Ability to Work in Group": [3, 3],
    },
    "General Aptitude and Personality": {
      "Willingness to Learn": [4, 4],
      "Ability to handle stress": [3, 3],
      "General Demeanor": [3, 3],
    },
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // Function to calculate totals
  const calculateSectionTotals = () => {
    const totals = [];
    for (const [section, skills] of Object.entries(evaluateData)) {
      let totalScore = 0;
      let maxScore = 0;

      Object.values(skills).forEach(([score, max]) => {
        totalScore += score;
        maxScore += max;
      });

      totals.push({ section, totalScore, maxScore });
    }
    return totals;
  };

  const sectionTotals = calculateSectionTotals();

  return (
    <Box className="p-5 bg-gray-100">
      {/* Header Section */}
      <div className="p-5 mb-5 flex justify-between bg-white rounded-md shadow-sm">
        <div>
          <Typography variant="h4" className="font-bold text-[#0E8CCA]">
            Candidate Interview Report
          </Typography>
          <span className="mt-4">
            <Typography variant="subtitle1">
              <strong className="text-[#464646]">Interview Title:</strong>{" "}
              Advanced Interview
            </Typography>
            <Typography variant="subtitle1">
              <strong className="text-[#464646]">Organization:</strong>XYZ Corp
            </Typography>
            <Typography variant="subtitle1">
              <strong className="text-[#464646]">Role:</strong> Software
              Engineer
            </Typography>
            <Typography variant="subtitle1">
              <strong className="text-[#464646]">Date:</strong> 2024-12-06
            </Typography>
          </span>
        </div>

        {/* Candidate Information */}
        <div>
          <Typography
            variant="h5"
            className="font-bold mb-2 text-[#0E8CCA] text-end"
          >
            Candidate Info.
          </Typography>
          <div className="mt-2 flex flex-row-reverse gap-x-3 items-center">
            <Avatar
              {...stringAvatar("Kent Dodds")}
              variant="rounded"
              style={{ height: "10vh", width: "10vh", marginBottom: "10px" }}
            />
            <span className="text-end">
              <Typography variant="body1">
                <strong className="text-[#464646]">Name:</strong> Shivam
                Pokharkar
              </Typography>
              <Typography variant="body1">
                <strong className="text-[#464646]">Candidate ID:</strong>{" "}
                CND12345
              </Typography>
              <Typography variant="body1">
                <strong className="text-[#464646]">Email:</strong>{" "}
                shivam.pokharkar@gmail.in
              </Typography>
            </span>
          </div>
        </div>
      </div>

      {/* Performance Evaluation */}
      <div className="p-5 mb-5 bg-white rounded-md shadow-sm">
        <Typography variant="h5" className="font-bold mb-2 text-[#0E8CCA]">
          Performance Evaluation
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          <div className="border p-3 rounded-md">
            <Typography variant="h6" className="font-bold">
              Section-wise Performance (Bar Chart)
            </Typography>
            <Bar data={barChartData} />
          </div>
          <div className="border p-3 rounded-md">
            <Typography variant="h6" className="font-bold">
              Overall Score Distribution (Pie Chart)
            </Typography>
            <Pie
              data={pieChartData}
              style={{ height: "300px", width: "300px" }} // Set height and width here
            />
          </div>
          <div className="border p-3 rounded-md">
            <Typography variant="h6" className="font-bold">
              Performance Overview (Radar Chart)
            </Typography>
            <Radar data={radarChartData} />
          </div>
        </div>
      </div>

      {Object.entries(evaluateData).map(([sectionTitle, metrics]) => (
        <div
          key={sectionTitle}
          className="p-5 mb-5 bg-white rounded-md shadow-sm"
        >
          <Typography variant="h5" className="font-bold mb-2 text-[#0E8CCA]">
            {sectionTitle}
          </Typography>
          <div className="flex flex-row justify-between px-4 pt-4">
            {Object.entries(metrics).map(([metric, score]) => (
              <div key={metric} className="flex flex-col items-center">
                <CircularProgress
                  size="lg"
                  determinate
                  value={(score[0] / score[1]) * 100}
                >
                  {`${score[0]} / ${score[1]}`}
                </CircularProgress>
                <h1 className="mt-2 text-center">{metric}</h1>
              </div>
            ))}
          </div>
        </div>
      ))}


      {/* Performance Evaluation */}
      <div className="p-5 bg-white rounded-md shadow-sm">
        <Typography variant="h5" className="font-bold mb-4">
          Section Totals
        </Typography>
        {sectionTotals.map(({ section, totalScore, maxScore }) => (
          <Typography key={section} variant="body1">
            <span>{section}:</span> {totalScore}/{maxScore}
          </Typography>
        ))}
      </div>

      {/* Download Button */}
      <Box className="mt-5 flex justify-end">
        <Button variant="contained" color="primary">
          Download Report as PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ReportPage;
