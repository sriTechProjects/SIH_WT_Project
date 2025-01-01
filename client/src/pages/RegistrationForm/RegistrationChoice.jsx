import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/drdo-logo.svg";

const RegistrationChoice = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="drdo-logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold text-[#0E8CCA] ml-3">E.B.R.S.</h1>
        </div>
        <div className="form-header text-center mb-5">
          <h1 className="text-3xl font-semibold">Register Your Account</h1>
          <p className="text-gray-500 mt-1 font-medium text-md">
            Choose your registration type
          </p>
        </div>

        <div className="flex flex-col gap-y-4 mt-6">
          {/* Candidate Registration */}
          <button
            className="w-full bg-[#0E8CCA] text-white py-2 px-4 rounded hover:bg-[#0969A3] transition-all"
            onClick={() => navigate("/register/candidateregister")}
          >
            Register as Candidate
          </button>

          {/* Expert Registration */}
          <button
            className="w-full bg-none border border-[#ccc] text-[#333] py-2 px-4 rounded hover:bg-[#eee] transition-all"
            onClick={() => navigate("/register/expertregister")}
          >
            Register as Expert
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
};

export default RegistrationChoice;