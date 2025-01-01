import React from "react";

const InterviewCardComponent = () => {
  return (
    <div className="bg-[#F6F8FB] h-[290px] w-[276px] border border-gray-300 rounded-md p-4 flex-grow">
      {/* Render the card's content */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">title</h2>
      <p className="text-sm text-gray-600">description</p>
    </div>
  );
};

export default InterviewCardComponent;
