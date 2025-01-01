import React from "react";

const CandidateNameCard = () => {
  return (
    <div className="w-full h-full mt-2 md:mt-0 flex flex-col bg-white shadow-md shadow-slate-200 rounded-xl border border-slate-200">
      <div className="w-full h-1/2 flex justify-center items-center">
        <img
          className="w-32 rounded-full p-2 border shadow-md border-slate-200"
          src="https://pics.craiyon.com/2023-07-01/aaae17e348474bc3843c3d40ca53c15f.webp"
          alt=""
        />
      </div>
      <div className="w-full h-1/2 flex justify-center items-center flex-col">
        <p className="text-xl font-bold text-slate-700">Rahul Rashtogi</p>
        <p className=" text-[#2196f3]">@rahulrashtogi@drdo.com</p>
        <p className="text-slate-600 text-sm">H.O.D Dept AI & ML</p>
      </div>
    </div>
  );
};

export default CandidateNameCard;
