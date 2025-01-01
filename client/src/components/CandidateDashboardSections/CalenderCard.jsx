import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoClock } from "react-icons/go";

function CalenderCard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full h-full border-2 p-2 bg-white border-slate-200 shadow-md rounded-2xl">
      <div className="w-full h-[70%] flex justify-center items-center">
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar rounded-xl" // Add a custom class
        />
      </div>

      <div className="w-full h-[30%] flex justify-center items-center ">
        <div className="w-full h-full rounded-xl border flex border-slate-300 shadow-md p-2">
          <div className="w-[40%] h-full">
            <img
              className="w-28 rounded-xl"
              src="https://marketplace.canva.com/EAEdeiU-IeI/1/0/1600w/canva-purple-and-red-orange-tumblr-aesthetic-chill-acoustic-classical-lo-fi-playlist-cover-jGlDSM71rNM.jpg"
              alt=""
            />
          </div>
          <div className="w-[60%] h-full flex justify-center items-center">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-400">
                Interview Scheduled for
              </p>
              <p className="text-lg font-bold -tracking-tight text-slate-800">
                AI in defence
              </p>
              <p className="text-sm font-semibold text-slate-500 flex justify-center items-center">
                12:00 - 2:00 PM{" "}
                <span className="inline-block ml-1 text-xl">
                  <GoClock />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderCard;
