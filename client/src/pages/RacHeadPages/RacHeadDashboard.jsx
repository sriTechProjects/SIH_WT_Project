import React from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import DashboardNumberCards from "../../components/RacHeadComponents/DashboardNumberCards";
import Grid from "@mui/material/Grid2";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InterviewCardComponent from "../../components/RacHeadComponents/InterviewCardComponent";
// import BarChartComponent from "../../components/ChartsComponents/BarChartComponent";
import BarChart from "../../components/RacHeadComponents/Barchart";
// import DoughnutChatComponent from "../../components/ChartsComponents/DoughnutChartComponent";
import DoughnutChartComponent from "../../components/RacHeadComponents/DoughnutChartComponent";
import Slider from "react-slick";
// import { AuthContext } from "../../context/AuthenticationContext"; 

const RacHeadDashboard = () => {
  // const { currentUser } = useContext(AuthContext);
  // console.log('Curent user data: ', currentUser);

  const numberCardsStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem 0",
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  // Sample card data
  const cards = [
    { id: 1, title: "Card 1", description: "This is card 1" },
    { id: 2, title: "Card 2", description: "This is card 2" },
    { id: 3, title: "Card 3", description: "This is card 3" },
    { id: 4, title: "Card 4", description: "This is card 4" },
    { id: 5, title: "Card 5", description: "This is card 5" },
  ];

  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 overflow-y-auto">
        <RacHeader />
        <div className="pannels-container flex flex-grow gap-y-5 gap-x-5">
          <Grid container spacing={2} >
            <Grid size={5}>
              {/* Number cards */}
              <Grid container rowSpacing={2} columnSpacing={2}>
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={FaUser}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={MdGroups}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={RiCalendarScheduleFill}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={IoDocumentText}
                />
              </Grid>
            </Grid>

            {/* Grid for bar chart */}
            <Grid
              size={7}
              sx={{
                borderRadius: "10px",
                background: "#fff",
              }}
            >

              <div
                className="p-1 rounded-[10px]"
                style={{ background: "white", width: "fit" }}
              >
                <BarChart />
              </div>
            </Grid>

            {/* Doughnut chart */}
            <Grid
              size={5}
              sx={{
                borderRadius: "10px",
                background: "#fff",
                maxHeight: "fit-content",
              }}
            >
              <div
                className="rounded-lg p-1"
                style={{ height: "90%", background: "white", width: "fit" }}
              >
                <DoughnutChartComponent />
              </div>
            </Grid>

            {/* Upcoming interviews */}
            <Grid
              size={7}
              sx={{
                borderRadius: "10px",
                background: "#fff",
                padding: "1.2rem",
              }}
            >
              <div className="flex justify-between items-center w-full mb-6">
                <h1 className="font-semibold text-xl text-[#333]">
                  Upcoming Interviews
                </h1>
                
              </div>
              <div className="md:h-[80%] h-[70%] w-full p-2 flex gap-x-3 overflow-x-auto">
                
                  <InterviewCardComponent/>
                  <InterviewCardComponent />
                  <InterviewCardComponent />
                  <InterviewCardComponent />
                  <InterviewCardComponent />
                
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadDashboard;