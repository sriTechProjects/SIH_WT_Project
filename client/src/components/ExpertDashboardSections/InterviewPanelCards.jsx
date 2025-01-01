import React from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiClock } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import CircularProgress from '@mui/joy/CircularProgress';

const InterviewPanelCards = ({ panelName, departmentName, candidateCount }) => {
  return (
    <div className="min-h-[34vh] min-w-[32vh] bg-[#F6F8FB] rounded-lg shrink-0 p-4 flex flex-col gap-y-5">
      {/* Card Content */}
      <div className="flex items-center gap-x-4">
        <span
          className="h-[9vh] w-[8vh] rounded-lg text-white bg-blue-700 text-base flex justify-center items-center shrink-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          <p className="text-center font-medium">1 Sept 2024</p>
        </span>
        <h1 className="font-semibold text-[#3C3C3C]">{panelName}</h1>
      </div>

      <div className="flex flex-col gap-y-3">
        <span className="flex justify-start items-center gap-x-4 pl-2 text-[#464646]">
          <HiOutlineOfficeBuilding />
          <p className="font-medium text-base">{departmentName}</p>
        </span>

        <span className="flex justify-start items-center gap-x-4 pl-2 text-[#464646]">
          <FiClock />
          <p className="font-medium text-base">12:00 to 2:00pm</p>
        </span>

        <span className="flex justify-start items-center gap-x-4 pl-2 text-[#464646]">
          <MdGroups />
          <p className="font-medium text-base">{candidateCount} Candidates</p>
        </span>
      </div>

      <div className="flex gap-x-5 items-center">
        <button className="w-full h-fit py-3 text-base bg-[#333] rounded-md text-white font-medium">
          Open
        </button>
        <CircularProgress determinate value={25} size="lg">
            25%
        </CircularProgress>
      </div>
    </div>
  );
};

export default InterviewPanelCards;