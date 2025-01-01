import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import UpcomingInterviewsCard from "./UpcomingInterviewCard";

function UpcomingInterviews() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden bg-white shadow-md shadow-slate-200 rounded-xl border border-slate-200">
      {/* Header */}
      <div className="w-full md:h-[20%] h-[30%] flex justify-between items-center p-5">
        <div>
          <h1 className="text-lg -tracking-tight">Upcoming Interviews</h1>
        </div>
        <div className="gap-2 flex mt-2 mb-2">
          {/* Select Month */}
          <select
            className="border-2 py-1 w-[140px] bg-white rounded-lg border-slate-300 outline-none pl-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select Month
            </option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>

          {/* Select Department */}
          <select
            className="border-2 bg-white py-1 ml-2 w-[160px] rounded-lg border-slate-300 outline-none pl-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select Department
            </option>
          </select>
        </div>
      </div>

      {/* Slider Section */}
      <div className="md:h-[80%] h-[70%] w-full p-2">
        <Slider {...settings}>
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
          <UpcomingInterviewsCard />
        </Slider>
      </div>
    </div>
  );
}

export default UpcomingInterviews;
