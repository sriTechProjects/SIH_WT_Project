import React from "react";
import Avatar from "react-avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiNotification2Line } from "react-icons/ri";
import { Badge } from "@mui/material";

const RacHeader = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine the time of day and set the appropriate greeting
  const getGreeting = () => {
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <header className="flex justify-between items-center">
      <span className="greetings flex items-center gap-x-3">
        <span className="greetings-right flex flex-col">
          <h1 className="font-semibold text-2xl text-[#181818]">{getGreeting()}</h1>
          <h3 className="text-[#585858] font-medium">{formattedDate}</h3>
        </span>
      </span>
      <span className="right flex items-center gap-x-3">
        <div
          className="notification bg-white h-[53px] w-[53px] rounded-full flex justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
        >
          <Badge badgeContent={4} color="primary">
            <RiNotification2Line color="0E8CCA" size={"1.5rem"} />
          </Badge>
        </div>
        <div
          className="notification bg-white px-2 h-[53px] rounded-full flex justify-center items-center gap-x-3"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
        >
          <span>
            <Avatar name="Amrik Bhadra" size="40" round />
          </span>
          <span>
            <h1 className="text-[#333] font-medium text-sm">Amrik Bhadra</h1>
            <p className="text-xs text-[#aaa]">amrik.bhadra@mitaoe.ac.in</p>
          </span>
          <IoMdArrowDropdown size={"1.4rem"} color="#0E8CCA" />
        </div>

        {/* <FontSizeAdjuster/> */}
      </span>
    </header>
  );
};

export default RacHeader;
