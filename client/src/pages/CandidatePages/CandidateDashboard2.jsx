import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import ExpertHeader from "../../components/ExpertDashboardSections/ExpertHeader";
import "../../styles/ExpertStyle.css";
import RadarChartComponent from "../../components/ChartsComponents/RadarChartComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/joy/Avatar";
import ai_in_defence from "../../assets/pannel_images/ai-in_defence.jpeg";

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import CandidateApplicationCard from "../../components/CandidateDashboardSections/CandidateApplicationCard";
import axios from "axios";
import toast from "react-hot-toast";

const CandidateDashboard2 = () => {
  const { currentUser } = useContext(AuthContext);
  const userInformation = currentUser?.response;
  console.log(currentUser);
  const user = {
    name: userInformation?.personalDetails?.name?.firstName || "NA",
    email:
      userInformation?.personalDetails?.contact?.email ||
      currentUser?.email ||
      "No email",
    avatar: `${
      userInformation?.personalDetails?.name?.firstName.slice(0, 1) || "N"
    }${userInformation?.personalDetails?.name?.lastName?.slice(0, 1) || "A"}`,
  };

  const [candidateData, setCandidateData] = useState({
    personalDetails: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      contact: {
        email: "",
      },
    },
    resume: {
      filename: "",
      fileType: "",
    },
    skillRelevancyScore: {
      skills: 0,
      yearsOfExperience: 0,
      researchPapers: 0,
      projects: 0,
      totalSkillRelevancyScore: 0,
    },
    approachRelevancyScore: {
      problemSolving: 0,
      collaboration: 0,
      decisionMaking: 0,
      creativity: 0,
      analyticalDepth: 0,
      totalApproachRelevancyScore: 0,
    },
    finalScore: 0,
    __v: 0,
  });

  // Define max values for each category
  const maxValues = {
    problemSolving: 9,
    collaboration: 3,
    decisionMaking: 7.5,
    creativity: 4.5,
    analyticalDepth: 6,
  };

  const [normalizedScores, setNormalizedScores] = useState({
    "Problem Solving": 0,
    "Collaborative Thinking": 0,
    "Decision Making": 0,
    "Creative Thinking": 0,
    "Analytical Depth": 0,
  });

  useEffect(() => {
    if (!currentUser?.id) {
      console.error("User ID is not available in AuthContext.");
      return;
    }

    const fetchData = async () => {
      try {
        // setLoading(true);

        // Make API request to fetch expert data
        const response = await axios.get(
          "http://localhost:8000/api/candidate/dashboard",
          {
            params: { id: currentUser.id },
          }
        );

        console.log("Response: ", response);

        // Extract the expert data from the response
        const candidate = response.data.candidate;

        // Ensure the expert data matches the schema structure
        const candidateDataFromAPI = {
          personalDetails: {
            name: {
              firstName: candidate.personalDetails?.name?.firstName || "",
              middleName: candidate.personalDetails?.name?.middleName || "",
              lastName: candidate.personalDetails?.name?.lastName || "",
            },
            contact: {
              email: candidate.personalDetails?.contact?.email || "",
            },
          },
          resume: {
            filename: candidate.resume?.filename || "",
            fileType: candidate.resume?.fileType || "",
          },
          skillRelevancyScore: {
            skills: candidate.skillRelevancyScore?.skills || "",
            yearsOfExperience:
              candidate.skillRelevancyScore?.yearsOfExperience || "",
            researchPapers: candidate.skillRelevancyScore?.researchPapers || "",
            projects: candidate.skillRelevancyScore?.projects,
            totalSkillRelevancyScore:
              candidate.skillRelevancyScore?.totalSkillRelevancyScore,
          },
          approachRelevancyScore: {
            problemSolving:
              candidate.approachRelevancyScore?.problemSolving || "",
            collaboration:
              candidate.approachRelevancyScore?.collaboration || "",
            decisionMaking:
              candidate.approachRelevancyScore?.decisionMaking || "",
            creativity: candidate.approachRelevancyScore?.creativity || "",
            analyticalDepth:
              candidate.approachRelevancyScore?.analyticalDepth || "",
            totalApproachRelevancyScore:
              candidate.approachRelevancyScore?.totalApproachRelevancyScore ||
              "",
          },
          _v: candidate._v || "",
        };

        const normalized = {
          "Problem Solving":
            candidateDataFromAPI.approachRelevancyScore.problemSolving * 2.5,
          "Collaborative Thinking":
            candidateDataFromAPI.approachRelevancyScore.collaboration * 2.5,
          "Decision Making":
            candidateDataFromAPI.approachRelevancyScore.decisionMaking * 2.5,
          "Creative Thinking":
            candidateDataFromAPI.approachRelevancyScore.creativity * 2.5,
          "Analytical Depth":
            candidateDataFromAPI.approachRelevancyScore.analyticalDepth * 2.5,
        };

        // Update the expertData state with the fetched data
        setCandidateData(candidateDataFromAPI);

        // Normalize the scores assuming the values in the API response are numbers

        console.log("Normalized data: ", normalized);

        // Update normalized scores state
        setNormalizedScores(normalized);
      } catch (err) {
        console.error("Error fetching data:", err.message || err);
        // Optional: You can also show an error toast here
        toast.error(`${err.message}`);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.id]);

  return (
    <div>
      {/* <span className="flex justify-center w-screen py-3 bg-[#464646] text-center text-white">
          Give the Approach Relevancy Test. <span className="pl-4 font-semibold underline">Go to Test</span>
      </span> */}
      <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center items-start">
        <div className="w-[85%] h-[95%] flex flex-col justify-start items-center">

          {/* Header Section */}
          <ExpertHeader user={candidateData.personalDetails} />

          {/* Main Content Section */}
          <div className="wrapper-box w-full flex-1 gap-2 md:h-[320px]">
            {/* upcoming inyerview panel */}
            <div className="box a">
              <header className="flex justify-between items-center">
                <h1 className="text-2xl text-[#0E8CCA] font-medium">
                  Applications
                </h1>
                <span className="flex gap-x-3">
                  {/* department filter */}
                  <FormControl sx={{ minWidth: "120px" }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Month
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="Month"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={"january"}>January</MenuItem>
                      <MenuItem value={"february"}>February</MenuItem>
                      <MenuItem value={"march"}>March</MenuItem>
                      <MenuItem value={"april"}>April</MenuItem>
                      <MenuItem value={"may"}>May</MenuItem>
                      <MenuItem value={"june"}>June</MenuItem>
                      <MenuItem value={"july"}>July</MenuItem>
                      <MenuItem value={"august"}>August</MenuItem>
                      <MenuItem value={"september"}>September</MenuItem>
                      <MenuItem value={"october"}>October</MenuItem>
                      <MenuItem value={"november"}>November</MenuItem>
                      <MenuItem value={"december"}>December</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ minWidth: "140px" }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      label="Department"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      <MenuItem value={10}>IT</MenuItem>
                      <MenuItem value={20}>HR</MenuItem>
                      <MenuItem value={30}>Finance</MenuItem>
                    </Select>
                  </FormControl>
                </span>
              </header>

              <main
                className="w-full mt-3 p-3 flex gap-x-4 overflow-x-scroll scroll-smooth"
                style={{
                  scrollbarWidth: "none", // For Firefox
                  msOverflowStyle: "none", // For Internet Explorer/Edge
                }}
              >
                <CandidateApplicationCard title={'Scientist B'} desc={'Entry-level scientist, research-focused, engineering solutions for defense.'} status={'In Progress'} />
                <CandidateApplicationCard title={'Scientist D'} desc={'Mid-level scientist, project management, innovation, technical expertise, leadership.'} status={'Interview Scheduled'}/>
              </main>
            </div>

            {/* apprach relevancy score display */}
            <div className="box b">
              <RadarChartComponent data={normalizedScores} />
              <h1 className="text-center text-lg font-semibold -mt-2">
                <span className="px-4 py-2 border border-[#eee] rounded-md">
                  <span className="text-[#0E8CCA]">Total Score: </span>
                  {normalizedScores["Problem Solving"] +
                    normalizedScores["Collaborative Thinking"] +
                    normalizedScores["Decision Making"] +
                    normalizedScores["Creative Thinking"] +
                    normalizedScores["Analytical Depth"]}{" "}
                  / {25 * 5}
                </span>
              </h1>

              <div className="flex flex-col gap-y-3 mt-6">
                <h1 className="text-base text-[#0E8CCA] font-semibold">
                  Score Breakdown
                </h1>
                <div className="flex flex-col gap-y-3">
                  {Object.entries(normalizedScores).map(
                    ([key, value], index) => (
                      <span
                        key={index}
                        className="flex items-center justify-between text-base border border-[#eee] p-2 rounded-md"
                      >
                        <strong>{key}</strong>
                        <p className="color-[#464646]">{value} / 25</p>
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="box d flex flex-col gap-y-3">
              {/* upcoming interview schedule */}
              <div className="scheduedInterview h-[65%] w-full">
                <h1 className="text-xl text-[#0E8CCA] font-medium">
                  Upcoming Interview
                </h1>
                <div className="h-full w-full border rounded-md mt-3 p-[8px] flex items-center gap-x-3">
                  <div className="border h-full w-[16vh] shrink-0 rounded-md overflow-hidden shadow-sm">
                    <img
                      src={ai_in_defence}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="interview-content h-full w-full px-1 flex flex-col gap-y-3">
                    <div className="flex justify-between items-center">
                      <h1 className="text-[#464646] font-semibold text-xl">
                        AI in Defence
                      </h1>
                      <Tooltip title="Date of Interview">
                        <span
                          className="flex p-1 text-base items-center gap-x-1 text-[#0E8CCA] border border-[#0E8CCA] rounded-md"
                          style={{ background: "rgba(14, 140, 202, 0.1)" }}
                        >
                          <FaRegCalendarAlt />
                          <p className="text-sm font-medium">07-12-24</p>
                        </span>
                      </Tooltip>
                    </div>
                    <p className="interview-desc text-xs text-[#464646] font-normal mt-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nam fugiat, dicta aliquam tempore sit quod?
                    </p>
                    <div className="flex gap-x-2 gap-y-2 flex-wrap mt-1">
                      <Tooltip title="Job Role for Interview">
                        <span
                          className="flex p-1 text-base items-center gap-x-[6px] text-[#00B65E] border border-[#00B65E] rounded-md w-fit cursor-pointer"
                          style={{ background: "rgba(0, 182, 94, 0.12)" }}
                        >
                          <IoBriefcaseOutline />
                          <p className="text-xs font-medium">Scientist A</p>
                        </span>
                      </Tooltip>

                      <Tooltip title="Department">
                        <span
                          className="flex p-1 text-base items-center gap-x-[6px] text-[#D939CD] border border-[#D939CD] rounded-md w-fit cursor-pointer"
                          style={{ background: "rgba(217, 57, 205, 0.12)" }}
                        >
                          <FaRegBuilding />
                          <p className="text-xs font-medium">
                            Dept. of AI & ML
                          </p>
                        </span>
                      </Tooltip>

                      <Tooltip title="Time of Interview">
                        <span
                          className="flex p-1 text-base items-center gap-x-[6px] text-[#E80505] border border-[#E80505] rounded-md w-fit cursor-pointer"
                          style={{ background: "rgba(232, 5, 5, 0.12)" }}
                        >
                          <FaRegClock />
                          <p className="text-xs font-medium">
                            10:00am to 12:00pm
                          </p>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* expert profile details */}
            <div className="box c p-3 flex flex-col justify-center items-center gap-y-3">
              {/* profile pic */}
              <div className="border-2 border-[#F7F7F7] rounded-[1000px] p-[9px]">
                <div className="border-2 border-[#F3F3F3] rounded-[1000px] p-[8px]">
                  <div className="border-2 border-[#EBEBEB] rounded-[1000px] p-[7px] relative">
                    <Avatar
                      sx={{
                        height: "6rem",
                        width: "6rem",
                        fontSize: "2rem",
                      }}
                    >
                      {candidateData.personalDetails.name.firstName[0]}
                      {candidateData.personalDetails.name.lastName[0]}
                      {/* AB */}
                    </Avatar>
                    <span
                      className="h-[9px] w-[9px] rounded-full absolute -top-[5px] left-12"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                      }}
                    ></span>
                    <span
                      className="h-[9px] w-[9px] rounded-full absolute top-[48%] -left-[6px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                      }}
                    ></span>
                    <span
                      className="h-[7px] w-[7px] rounded-full absolute top-[22px] right-1"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)",
                      }}
                    ></span>
                    <span
                      className="h-[8px] w-[8px] rounded-full absolute left-3"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, #00c6fb 0%, #005bea 100%)",
                      }}
                    ></span>
                    <span
                      className="h-[6px] w-[6px] rounded-full absolute left-14 -bottom-[14px] "
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)",
                      }}
                    ></span>

                    <span
                      className="h-[6px] w-[6px] rounded-full absolute -right-[5px] bottom-[20px] "
                      style={{
                        backgroundImage:
                          "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)",
                      }}
                    ></span>

                    <span
                      className="h-[5px] w-[5px] rounded-full absolute -left-[9px] top-[7px] "
                      style={{
                        backgroundImage:
                          "linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%)",
                      }}
                    ></span>

                    <span
                      className="h-[5px] w-[5px] rounded-full absolute right-[0px] -top-[4px] "
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
                      }}
                    ></span>
                  </div>
                </div>
              </div>

              <span className="flex flex-col -gap-y-1 items-center">
                <h1 className="text-[#3C3C3C] font-semibold text-xl">
                  {candidateData.personalDetails.name.firstName}
                  {candidateData.personalDetails.name.lastName}
                  {/* AB */}
                </h1>
                <h4 className="text-[#3EB2F2] font-medium text-base">
                  {candidateData.personalDetails.contact.email}
                </h4>
                {/* <p className="text-[#333] font-medium text-sm">
                H.O.D - Dept. of AI & ML
              </p> */}
              </span>

              <div className="flex justify-center gap-x-4 mt-2">
                <button className="text-sm text-white font-medium bg-[#333] py-[0.7rem] rounded-md w-[9rem]">
                  View Resume
                </button>
                <button className="text-sm text-[#333] font-medium bg-[#f4f4f4] py-[0.7rem] rounded-md w-[9rem]">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard2;
