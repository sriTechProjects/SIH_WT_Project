import React, { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
// import CandidatePersonalInformation from "../../components/ExpertDetailSections/ExpertPersonalInformation";
import CandidatePersonalInformation from "../../components/CandidateDetailSections/CandidatePersonalInformation";
// import CandidateEducationalInformation from "../../components/ExpertDetailSections/ExpertEducationalInformation";
import CandidateEducationalInformation from "../../components/CandidateDetailSections/CandidateEducationaIInformation";
// import CandidateCriticalSection from "../../components/ExpertDetailSections/ExpertCriticalSection";
import CandidateCriticalSection from "../../components/CandidateDetailSections/CandidateCriticalSection";
// import CandidateAdditionalInputs from "../../components/ExpertDetailSections/ExpertAdditionalInputs";
import CandidateAdditionalInputs from "../../components/CandidateDetailSections/CandidateAdditionalInputs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateCompleteDetail = () => {
  const mini = 1;
  const maxi = 4;
  const navigate = useNavigate();
  const [stepNo, setStepNo] = useState(1);
  // console.log(stepNo);
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNo: "",
      gender: "",
      govtIdType: "",
      govtIdNo: "",
      recoveryEmail: "",
      age: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
      role:"candidate"
    },
    educationalInfo: [],
    criticalInputs: {
      resume: "",
      yearsOfExperience: "",
      skills: [],
      expertise: [],
    },
    additionalInputs: {
      projects: [],
      publications: [],
    },
  });

  const validateStep = () => {
    if (stepNo === 1) {
      const {
        firstName,
        lastName,
        phoneNo,
        gender,
        govtIdType,
        govtIdNo,
        recoveryEmail,
        age,
        pincode,
        city,
        state,
        address,
      } = userData.personalInfo;

      // Check required fields
      if (
        !firstName ||
        !lastName ||
        !phoneNo ||
        !gender ||
        !govtIdType ||
        !govtIdNo ||
        !recoveryEmail ||
        !age ||
        !pincode ||
        !city ||
        !state ||
        !address
      ) {
        toast.error("Please fill all the required fields.");
        return false;
      }

      // Validate phone number
      if (!/^\d{10}$/.test(phoneNo)) {
        toast.error("Phone number must be 10 digits.");
        return false;
      }

      // Validate age
      if (isNaN(age) || age < 18 || age > 120) {
        toast.error("Age must be a number between 18 and 120.");
        return false;
      }

      // Validate email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(recoveryEmail)) {
        toast.error("Please provide a valid email address.");
        return false;
      }
    }

    if (stepNo === 2) {
      if (userData.educationalInfo.length === 0) {
        toast.error("Please add at least one educational detail.");
        return false;
      }
    }

    if (stepNo === 3) {
      const { resume, yearsOfExperience, skills, expertise } =
        userData.criticalInputs;
      if (
        !resume ||
        !yearsOfExperience ||
        skills.length === 0 ||
        expertise.length === 0
      ) {
        toast.error(
          "Please upload your resume, select years of experience, add at least one skill, and specify an area of expertise."
        );
        return false;
      }
    }

    if (stepNo === 4) {
      const { projects, publications } = userData.additionalInputs;
      if (projects.length === 0 || publications.length === 0) {
        toast.error("Please add at least one project and one publication.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStepNo(stepNo + 1);
    }
  };

  const handlePrevious = () => {
    setStepNo(stepNo - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate data before submission
    if (!validateStep()) {
      return;
    }

    // Extract email from the URL
    const email = new URLSearchParams(location.search).get("email");
    const formData = new FormData();

    // Append userData to FormData
    for (const key in userData) {
      if (Array.isArray(userData[key]) || typeof userData[key] === "object") {
        formData.append(key, JSON.stringify(userData[key]));
      } else {
        formData.append(key, userData[key]);
      }
    }

    // Append the resume file
    if (userData.criticalInputs.resume) {
      console.log("Resume: ",userData.criticalInputs.resume);
      console.log(typeof userData.criticalInputs.resume)
      formData.append("resume", userData.criticalInputs.resume); // Append the File object
    }

    // Append email if available
    if (email) {
      formData.append("email", email);
    }

    try {
      // Debugging FormData entries
      // for (const [key, value] of formData.entries()) {
      //   // console.log(`${key}:`, value);
      // }
      console.log(formData.criticalInputs);
      // Make POST request to the API
      const response = await axios.post(
        "http://localhost:8000/api/candidate/completeDetails",
        formData,
      );
      if (response.status === 200) {
        toast.success("Candidate details saved successfully.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error || "Failed to save candidate details."
      );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#eee] flex justify-center items-center">
      <form
        className="form-container bg-white rounded-lg p-8 flex flex-col gap-y-8 shadow-md"
        style={{
          width: "95%",
          maxWidth: "900px",
          height: "95%",
          maxHeight: "800px",
          overflowY: "auto",
        }}
        onSubmit={handleSubmit}
      >
        {stepNo === 1 && (
          <CandidatePersonalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 2 && (
          <CandidateEducationalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 3 && (
          <CandidateCriticalSection
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 4 && (
          <CandidateAdditionalInputs
            userData={userData}
            setUserData={setUserData}
          />
        )}

        <div className="flex gap-3">
          {stepNo > mini && (
            <Button
              variant="outlined"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          {stepNo < maxi && (
            <Button
              variant="contained"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {stepNo === maxi && (
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "6rem", padding: "0.5rem" }}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CandidateCompleteDetail;
