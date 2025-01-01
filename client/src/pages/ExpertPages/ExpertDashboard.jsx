import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthenticationContext";
import ExpertHeader from "../../components/ExpertDashboardSections/ExpertHeader";
import "../../styles/ExpertStyle.css";
import RadarChartComponent from "../../components/ChartsComponents/RadarChartComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import axios from "axios";
import Avatar from "@mui/joy/Avatar";
import InterviewPanelCards from "../../components/ExpertDashboardSections/InterviewPanelCards";
import { toast, Toaster } from "react-hot-toast";
import ExpertCalender from "../../components/ExpertDashboardSections/ExpertCalender";
// import Calendar from "../../components/CommonComponents/Calender";

const ExpertDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const userInformation = currentUser?.response;
  // console.log("UserInfo: ",userInformation);
  const [expertData, setExpertData] = useState({
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
    fieldOfExpertise: {
      resume: {
        filename: "",
        fileType: "",
      },
      domain: "",
      designation: "",
    },
    approachRelevancyScore: {
      problemSolving: "",
      collaboration: "",
      decisionMaking: "",
      creativity: "",
      analyticalDepth: "",
      totalApproachRelevancyScore: "",
    },
    __v: "",
  });
  const [upcomingInterview, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(currentUser?.id);
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

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState({
    [dayjs().format("YYYY-MM-DD")]: "Today is the default event.",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const addEvent = () => {
  //   const formattedDate = selectedDate.format("YYYY-MM-DD");
  //   const newEvent = prompt(
  //     Enter an event for ${formattedDate}:,
  //     events[formattedDate] || ""
  //   );
  //   if (newEvent) {
  //     setEvents((prevEvents) => ({
  //       ...prevEvents,
  //       [formattedDate]: newEvent,
  //     }));
  //   }
  // };

  // const currentDateEvent =
  //   events[selectedDate.format("YYYY-MM-DD")] || "No events for today.";

  // Define max values for each category
  // const maxValues = {
  //   problemSolving: 9,
  //   collaboration: 3,
  //   decisionMaking: 7.5,
  //   creativity: 4.5,
  //   analyticalDepth: 6,
  // };

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
        setLoading(true);

        // Make API request to fetch expert data
        const response = await axios.get(
          "http://localhost:8000/api/expert/dashboard",
          {
            params: { id: currentUser.id },
          }
        );

        // Extract the expert data from the response
        const expert = response.data.expert;
        console.log(expert);
        const panel = response.data.panels;
        const jobs = response.data.jobs;
        const upcomingInterview = response.data.responseArray;
        // console.log("Panel: ",panel);
        // console.log("Jobs",jobs);
        // console.log("Candidate: ", upcomingInterview);
        // Ensure the expert data matches the schema structure
        const expertDataFromAPI = {
          personalDetails: {
            name: {
              firstName: expert.personalDetails?.name?.firstName || "",
              middleName: expert.personalDetails?.name?.middleName || "",
              lastName: expert.personalDetails?.name?.lastName || "",
            },
            contact: {
              email: expert.personalDetails?.contact?.email || "",
            },
          },
          fieldOfExpertise: {
            resume: {
              filename: expert.fieldOfExpertise?.resume?.filename || "",
              fileType: expert.fieldOfExpertise?.resume?.fileType || "",
            },
            domain: expert.fieldOfExpertise?.domain || "",
            designation: expert.fieldOfExpertise?.designation || "",
          },
          approachRelevancyScore: {
            problemSolving: expert.approachRelevancyScore?.problemSolving || "",
            collaboration: expert.approachRelevancyScore?.collaboration || "",
            decisionMaking: expert.approachRelevancyScore?.decisionMaking || "",
            creativity: expert.approachRelevancyScore?.creativity || "",
            analyticalDepth:
              expert.approachRelevancyScore?.analyticalDepth || "",
            totalApproachRelevancyScore:
              expert.approachRelevancyScore?.totalApproachRelevancyScore || "",
          },
          _v: expert._v || "",
        };

        // Update the expertData state with the fetched data
        setExpertData(expertDataFromAPI);

        // Normalize the scores assuming the values in the API response are numbers
        const normalized = {
          "Problem Solving":
            expertDataFromAPI.approachRelevancyScore.problemSolving * 2.5,
          "Collaborative Thinking":
            expertDataFromAPI.approachRelevancyScore.collaboration * 2.5,
          "Decision Making":
            expertDataFromAPI.approachRelevancyScore.decisionMaking * 2.5,
          "Creative Thinking":
            expertDataFromAPI.approachRelevancyScore.creativity * 2.5,
          "Analytical Depth":
            expertDataFromAPI.approachRelevancyScore.analyticalDepth * 2.5,
        };

        // Update normalized scores state
        setNormalizedScores(normalized);
        setUpcomingInterviews(response.data.responseArray);
      } catch (err) {
        console.error("Error fetching data:", err.message || err);
        // Optional: You can also show an error toast here
        toast.error("Failed to fetch expert data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.id]); // Run this useEffect when currentUser.id changes

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center items-start">
      <div className="w-[85%] min-h-[95%] h-full flex flex-col justify-start items-center">
        {/* Header Section */}
        <ExpertHeader user={expertData.personalDetails} />

        {/* Main Content Section */}
        <div className="wrapper-box w-full flex-1 gap-2 md:h-[320px]">
          {/* upcoming inyerview panel */}
          <div className="box a">
            <header className="flex justify-between">
              <h1 className="text-xl text-[#0E8CCA] font-medium">
                Upcoming Interviews
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
                    <MenuItem value={10}>IT</MenuItem>
                    <MenuItem value={20}>HR</MenuItem>
                    <MenuItem value={30}>Finance</MenuItem>
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
              className="w-full mt-6 p-3 flex gap-x-4 overflow-x-scroll scroll-smooth"
              style={{
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer/Edge
              }}
            >
              {upcomingInterview.map((panelDetails, index) => (
                <InterviewPanelCards
                  key={index} // Unique key for each component
                  panelName={panelDetails.panelName}
                  departmentName={panelDetails.departmentName}
                  candidateCount={panelDetails.candidateCount}
                />
              ))}
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
                {Object.entries(normalizedScores).map(([key, value], index) => (
                  <span
                    key={index}
                    className="flex items-center justify-between text-base border border-[#eee] p-2 rounded-md"
                  >
                    <strong>{key.replace(/([A-Z])/g, " $1")}</strong>
                    <p className="color-[#464646]">{value} / 25</p>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* calender */}
          <ExpertCalender></ExpertCalender>

          {/* expert profile details */}
          <div className="box c p-3 flex flex-col justify-center items-center gap-y-3 h-fit">
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
                    {expertData?.personalDetails?.name?.firstName[0] +
                      "" +
                      expertData?.personalDetails?.name?.lastName[0] || ""}
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
                {/* {user.name} */}
                {expertData.personalDetails.name.firstName}{" "}
                {expertData.personalDetails.name.lastName}
              </h1>
              <h4 className="text-[#3EB2F2] font-medium text-base">
                {user.email}
              </h4>
              <p className="text-[#333] font-medium text-sm">{user.domain}</p>
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
  );
};

export default ExpertDashboard;