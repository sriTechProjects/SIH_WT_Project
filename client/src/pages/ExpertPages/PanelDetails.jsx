import ai_image from "../../assets/images/ai_in_defence_image.jpg";
import { IoArrowUndoCircle } from "react-icons/io5";
import ExpertHeader from "../../components/ExpertDashboardSections/ExpertHeader";
import PanelCandidateCard from "../../components/ExpertDashboardSections/PanelCandidateCard.jsx";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthenticationContext";

const PanelDetails = () => {
  const testPanelists = [
    {
      name: "Sumit Sharma",
      role: "Scientist B",
      degree: "MTech in AI",
      experience: "3 years",
      specialization: "Artificial Intelligence",
    },
    {
      name: "Aditi Rao",
      role: "Scientist C",
      degree: "PhD in Data Science",
      experience: "5 years",
      specialization: "Machine Learning",
    },
    {
      name: "Aditi Rao",
      role: "Scientist C",
      degree: "PhD in Data Science",
      experience: "5 years",
      specialization: "Machine Learning",
    },
    {
      name: "Sumit Sharma",
      role: "Scientist B",
      degree: "MTech in AI",
      experience: "3 years",
      specialization: "Artificial Intelligence",
    },
    {
      name: "Sumit Sharma",
      role: "Scientist B",
      degree: "MTech in AI",
      experience: "3 years",
      specialization: "Artificial Intelligence",
    },
    {
      name: "Sumit Sharma",
      role: "Scientist B",
      degree: "MTech in AI",
      experience: "3 years",
      specialization: "Artificial Intelligence",
    },
  ];
  const { currentUser } = useContext(AuthContext);
  const userInformation = currentUser?.response;
  const user = {
    name:
      userInformation?.personalDetails?.name?.firstName +
        " " +
        userInformation?.personalDetails?.name?.lastName || "NA",
    email:
      userInformation?.personalDetails?.contact?.email ||
      currentUser?.email ||
      "No email",
    avatar: `${
      userInformation?.personalDetails?.name?.firstName.slice(0, 1) || "N"
    }${userInformation?.personalDetails?.name?.lastName?.slice(0, 1) || "A"}`,
    domain:
      userInformation?.fieldOfExpertise?.designation ||
      currentUser?.designation,
  };
  return (
    <div className="bg-gray-100 min-h-screen pb-5">
      <div className="container mx-auto px-4 max-w-[1260px] flex flex-col gap-y-5">
        <ExpertHeader/>
        <main className="flex h-screen flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-6 bg-white rounded-xl drop-shadow-md max-w-[84vw] mx-auto">
          {/* Left Section */}
          <div className="flex-1 relative max-w-[30vw]">
            <div className="relative">
              <img
                src={ai_image}
                alt="AI in Defence"
                className="rounded-lg w-full h-auto mb-4 drop-shadow-md"
              />
              <div
                className="absolute top-4 left-4 w-8 h-8 cursor-pointer bg-white rounded-full p-2"
              >
                <IoArrowUndoCircle onClick={() => window.history.back()}/>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
              Artificial Intelligence in Defence
            </h1>
            <h2 className="text-xl text-gray-600 mb-4 text-center">
              Department of AI & ML
            </h2>
            <p className="text-gray-700 align-text-bottom">
              AI for Defence explores the application of artificial intelligence
              in military operations, enhancing decision-making, threat
              detection, and autonomous systems, while improving efficiency
              across land, sea, air, and cyberspace.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-scroll p-4 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testPanelists.map((panelist, index) => (
                  <PanelCandidateCard key={index} {...panelist} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default PanelDetails;
