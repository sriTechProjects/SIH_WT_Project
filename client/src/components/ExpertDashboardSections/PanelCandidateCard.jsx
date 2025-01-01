import React from "react";
import user_img from '../../assets/images/user_img_female.avif';
import { useNavigate } from "react-router-dom";


const PanelCandidateCard = ({ name, role, degree, experience, specialization }) => {
    const navigate = useNavigate();
  return (
    <div className="p-4 border border-black rounded-lg shadow-md bg-white min-h-23 max-w-fit">

      <div className="flex items-center space-x-4 pb-1 gap-y-2">
        <img className="w-20 h-20 object-cover rounded-lg mb-4" src={user_img} alt="User" />
        <h3 className="text-lg font-bold">{name}</h3>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Role: </p>
          <p className="text-sm text-gray-950">{role}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Degree: </p>
          <p className="text-sm text-gray-950">{degree}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Experience: </p>
          <p className="text-sm text-gray-950">{experience}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Specialization: </p>
          <p className="text-sm text-gray-950">{specialization}</p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-3">
        <button className="bg-gradient-to-r from-sky-700 to-cyan-400 text-white px-10 py-3 rounded hover:bg-blue-600 min-w-full"
        onClick={()=>{navigate('/expert/candidateevaluation')}}>
          Start Interview
        </button>
      </div>
    </div>

  );
};
export default PanelCandidateCard;