import React, { useState } from "react";
import { Button } from "@mui/material";
import ExpertPersonalInformation from "../../components/ExpertDetailSections/ExpertPersonalInformation";
import ExpertEducationalInformation from "../../components/ExpertDetailSections/ExpertEducationalInformation";
import ExpertCriticalSection from "../../components/ExpertDetailSections/ExpertCriticalSection";
import ExpertAdditionalInputs from "../../components/ExpertDetailSections/ExpertAdditionalInputs";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ExpertCompleteDetail = () => {
  const [stepNo, setStepNo] = useState(1);
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNo: "",
      govtIdType: "",
      govtIdNo: "",
      gender: "",
      age: "",
      contact: {
        email: "",
        phoneNo: "",
        recoveryEmail: "",
      },
      password: "",
      idProof: {
        type: "",
        number: "",
      },
      role: "Expert",
      ips: [],
    },
    fieldOfExpertise: {
      skills: [],
      yearsOfExperience: 0,
      qualifications: [
        {
          degree: "",
          institution: "",
          yearOfCompletion: "",
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          skillsGained: [],
        },
      ],
      publications: [
        {
          title: "",
          link: "",
          year: "",
          skills: [],
        },
      ],
      resume: {
        filename: "",
        fileType: "",
        data: "",
      },
    },
    availability: true,
    skillRelevancyScore: {
      skills: 0,
      yearsOfExperience: 0,
      qualifications: 0,
      researchPapers: 0,
      projects: 0,
      totalSkillRelevancyScore: 0,
    },
    approachRelevancyScore: {
      problemSolving: 0,
      collaboration: 0,
      decisionMaking: 0,
      creativity: 0,
      analyticalDepth: 0,
      totalApproachRelevancyScore: 0,
    },
    finalScore: 0,
    twoFactorAuth: {
      enabled: false,
      method: "",
    },
    interviewData: [
      {
        dateOfInterview: "",
        interviewCount: 0,
      },
    ],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const validateStep = () => {
    // Step 1 validation (Personal details)
    if (stepNo === 1) {
      const {
        firstName,
        lastName,
        phoneNo,
        gender,
        idProof: { type: govtIdType, number: govtIdNo },
        recoveryEmail,
        age,
      } = userData.personalDetails;

      // if (
      //   !firstName ||
      //   !lastName ||
      //   !phoneNo ||
      //   !gender ||
      //   !govtIdType ||
      //   !govtIdNo ||
      //   !recoveryEmail ||
      //   !age
      // ) {
      //   toast.error("Please complete all personal information fields.");
      //   return false;
      // }

      // Additional validation for age and phone number
      if (age > 18 || age < 100) {
        toast.error("Age must be between 18 and 100 years.");
        return false;
      }

      if (phoneNo.length !== 10) {
        toast.error("Phone number must be 10 digits.");
        return false;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(recoveryEmail)) {
        toast.error("Please provide a valid recovery email address.");
        return false;
      }
    }

    // Step 2 validation (Educational Information)
    if (stepNo === 2) {
      if (userData.fieldOfExpertise.qualifications.length === 0) {
        toast.error("Please add at least one educational detail.");
        return false;
      }
    }

    // Step 3 validation (Resume, Skills, Expertise)
    if (stepNo === 3) {
      const { resume, skills, domain } = userData.fieldOfExpertise;
      if (!resume || skills.length === 0 || !domain) {
        toast.error(
          "Please upload your resume, add at least one skill, and specify an area of expertise."
        );
        return false;
      }
    }

    // Step 4 validation (Projects and Publications)
    if (stepNo === 4) {
      const { projects, publications } = userData.fieldOfExpertise;
      if (projects.length === 0 && publications.length === 0) {
        toast.error("Please add at least one project or publication.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      setStepNo(stepNo + 1);
    }
  };

  const handlePrevious = () => {
    setStepNo(stepNo - 1);
  };

  const base_url = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      return;
    }
    try {
      const res = await axios.post(
        `${base_url}/api/expert/update/${id}`,
        { userData },
        { withCredentials: true }
      );
      if (res) {
        toast.success("Details submitted successfully!");
        navigate("/register/expert/quiz");
      }
    } catch (error) {
      toast.error(`Error submitting the expert detail form: ${error.message}`);
    }
  };

  return (
    <div className="min-h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center py-10">
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
        {/* Render Step Components */}
        {stepNo === 1 && (
          <ExpertPersonalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 2 && (
          <ExpertEducationalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 3 && (
          <ExpertCriticalSection
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 4 && (
          <ExpertAdditionalInputs
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {stepNo > 1 && (
            <Button
              variant="outlined"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          {stepNo < 4 && (
            <Button
              variant="contained"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {stepNo === 4 && (
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

export default ExpertCompleteDetail;
