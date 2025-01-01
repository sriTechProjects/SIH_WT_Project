import React from "react";
import { GoDownload } from "react-icons/go";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

const CandidateApplicationCard = ({title, desc, status}) => {
  return (
    <div className="w-[37vh] bg-[#F6F8FB] rounded-lg shrink-0 p-4 flex flex-col gap-y-4" style={{boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}}>
      {/* Card Content */}
      <div className="flex items-center justify-between gap-x-4">
        <h1 className="font-semibold text-2 xl text-[#3C3C3C]">{title}</h1>
        <Chip
          label={`${status}`}
          sx={{ backgroundColor: "#00B65E", color: "#fff" }}
        />
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="interview-desc text-sm text-[#464646] font-normal mt-1">
          {desc}
        </p>

        <div className="flex gap-x-2 gap-y-2 flex-wrap mt-1">

          <Tooltip title="Department">
            <span
              className="flex p-1 text-base items-center gap-x-[6px] text-[#0E8CCA] border border-[#0E8CCA] rounded-md w-fit cursor-pointer"
              style={{ background: "rgba(14, 140, 202, 0.14)" }}
            >
              <FaRegBuilding />
              <p className="text-xs font-medium">Dept. of AI & ML</p>
            </span>
          </Tooltip>

          <Tooltip title="Date of Interview">
            <span
              className="flex p-1 text-base items-center gap-x-1 text-[#0E8CCA] border border-[#0E8CCA] rounded-md"
              style={{ background: "rgba(14, 140, 202, 0.1)" }}
            >
              <FaRegCalendarAlt />
              <p className="text-sm font-medium">07-12-24</p>
            </span>
          </Tooltip>

          <Tooltip title="Time of Interview">
            <span
              className="flex p-1 text-base items-center gap-x-[6px] text-[#0E8CCA] border border-[#0E8CCA] rounded-md w-fit cursor-pointer"
              style={{ background: "rgba(14, 140, 202, 0.14)" }}
            >
              <FaRegClock />
              <p className="text-xs font-medium">10:00am to 12:00pm</p>
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="flex gap-x-4 justify-center items-center">
        <button className="w-full py-2 px-6 text-base bg-[#333] rounded-md text-white font-medium">
          View Report
        </button>

        <Tooltip title="Download Report">
          <button
            className="bg-[#fff] p-2 rounded-full"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            }}
          >
            <GoDownload style={{ color: "#0E8CCA" }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default CandidateApplicationCard;
