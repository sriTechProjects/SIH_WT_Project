import React from "react";

function NotificationUserCard() {
  return (
    <div className="w-full h-20 flex border-b border-slate-200 gap-1">
      <div className="w-[20%] h-full flex justify-center items-center p-2">
        <img
          className=" md:h-[70px] rounded-full"
          src="https://media.craiyon.com/2024-03-28/1seVscwMQ86TlE7UFJloCw.webp"
          alt=""
        />
      </div>
      <div className="w-[55%] p-2 h-full flex justify-center items-center">
        <p>Candidate ka dashboard</p>
      </div>
      <div className="w-[25%] h-full p-2 flex justify-center items-center">
        <button className="bg-slate-900 text-white px-3 py-1.5 text-xs rounded-2xl">
          30 min ago
        </button>
      </div>
    </div>
  );
}

export default NotificationUserCard;
