import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ChatBot from "../components/ChatBot/chatBot";

const UniversalLayout = () => {
  return (
    <div className="w-full min-h-screen relative ">
      {/* children components */}
      <div className="w-full min-h-full bg-red-500 pointer-events-auto ">
        <Outlet />
      </div>
      <div
        className="absolute bottom-0 right-0
            
            w-fit h-fit flex justify-end items-end z-20"
      >
        <ChatBot />
      </div>
    </div>
  );
};

export default UniversalLayout;
