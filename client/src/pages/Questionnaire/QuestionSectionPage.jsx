import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Problem Solving",
    description:
      "This section assesses your ability to identify, analyze, and solve problems efficiently, applying logical and innovative approaches.",
  },
  {
    title: "Decision Making",
    description:
      "Evaluate how effectively you can make informed and timely decisions based on available data and situational context.",
  },
  {
    title: "Creative Thinking",
    description:
      "Test your capacity to think outside the box, develop original ideas, and approach challenges in unconventional ways.",
  },
  {
    title: "Analytical Depth",
    description:
      "Measures your ability to dive into complex information, break it down systematically, and draw meaningful conclusions.",
  },
  {
    title: "Collaborative Thinking",
    description:
      "Examines your ability to work harmoniously with others, share ideas, and achieve common goals through teamwork.",
  },
];

const QuestionSectionPage = ({ totalScore, setTotalScore }) => {
  const location = useLocation();
  const { expertData = {} } = location.state || {};
  console.log(expertData);
  const navigate = useNavigate();
  const handleNavigation = (section) => {
    navigate("/questionnaire/questionsection/quizpage", {
      state: {
        title: section.title,
        expertData: expertData
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center items-start pb-8">
      <div className="w-[85%] min-h-screen flex flex-col justify-start items-center gap-y-5">
        {/* Header Section */}
        <header className="w-full h-28 flex justify-between items-center px-4 py-2 rounded-md">
          <div className="h-full w-full flex justify-start items-center gap-1 pl-1">
            <img className="w-20 h-auto" src={logo} alt="DRDO Logo" />
            <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
          </div>
          <div className="w-52 bg-white shadow-md border-t border-white h-12 flex justify-end items-center rounded-3xl">
            <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
              <div className="border-2 border-slate-400 w-10 ml-1 text-sm h-10 flex justify-center items-center rounded-full">
                {expertData.avatar}
              </div>
              <div>
                <p className="font-semibold">{expertData.name}</p>
                <p className="text-[9px]">{expertData.email}</p>
              </div>
              <FaAngleDown className="hover:text-slate-600" />
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="w-full flex flex-col gap-y-8 p-8 bg-white rounded-md shadow-sm">
          <h1 className="text-2xl text-[#0E8CCA] font-semibold">
            Five Sections of the Approach Relevancy Test
          </h1>
          <ul className="flex flex-col gap-y-4">
            {sections.map((section, index) => (
              <li
                key={index}
                className="w-full bg-[#f4f4f4] py-4 px-6 rounded-md shadow-sm border border-[#ccc] flex items-center justify-between"
              >
                <div className="w-[70%] flex flex-col gap-y-1">
                  <h2 className="text-lg text-[#464646] font-semibold">
                    Section - {index + 1}: {section.title}
                  </h2>
                  <p className="text-sm font-normal">{section.description}</p>
                </div>

                {totalScore[section.title] > 0 ? (
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      textTransform: "capitalize",
                      boxShadow: "none",
                      backgroundColor: "#00B65E",
                      color: "#fff",
                    }}
                    disabled="true"
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit-content",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleNavigation(section)}
                  >
                    Start Test
                  </Button>
                )}

                {/* <div>score: {totalScore[section.title]}</div> */}
              </li>
            ))}
          </ul>

          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              textTransform: "capitalize",
              padding: "0.7rem 1.2rem",
            }}
            onClick={() => {
              navigate("/questionnaire/resultpage",{ state: { expertData } });
            }}
          >
            Submit Complete Test
          </Button>
        </main>
      </div>
    </div>
  );
};

export default QuestionSectionPage;