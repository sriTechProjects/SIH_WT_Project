import React, { useState } from "react";
import ai_image from "../../assets/images/ai_image.jpg";
import user_image from "../../assets/images/rahul_rstogi.avif";
import { IoArrowUndo } from "react-icons/io5";
import CandidateEvaluationSection from "../../components/ExpertDashboardSections/CandidateEvaluationSection";

const CandidateEvaluation = () => {
  const userData = [
    {
      name: "Rahul Rastogi",
      email: "rahul.rastogi@drdo.com",
      designation: "H.O.D - Dept. of AI & ML",
      profilePicture: "rahul_rstogi.avif",
      documents: {
        resume: "Rahul_Resume.pdf",
        coverLetter: "cover_letter.pdf",
        educationalCertificates: [
          "BTech_degree.pdf",
          "MTech_degree.pdf",
          "PhD_degree.pdf",
        ],
      },
      workExperience: [
        {
          role: "AI Cybersecurity Engineer",
          duration: "2 years",
          company: "DRDO Labs",
        },
        {
          role: "NLP Engineer",
          duration: "2 years",
          company: "Advanced AI Research Center",
        },
      ],
      projects: [
        "Military Technology Project",
        "Autonomous Threat Detection System",
        "AI-Driven Decision Support Platform",
      ],
    },
  ];

  const [interviewScores, setInterviewScores] = useState({
    "Technical Knowledge": {
      fundamentalKnowledge: {
        question: "Explain the basics of the subject related to this domain.",
        score: "",
      },
      applicationKnowledge: {
        question:
          "Provide examples of how theoretical knowledge is applied practically.",
        score: 0,
      },
      currentTrends: {
        question: "Discuss the latest developments or trends in this field.",
        score: 0,
      },
      defenceTechnologies: {
        question:
          "What do you know about the current defence technologies and their applications?",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
    "Problem Solving": {
      problemSolvingApproach: {
        question: "Describe your approach to solving a challenging problem.",
        score: 0,
      },
      logicalReasoning: {
        question:
          "Provide an example of how you used logical reasoning to solve an issue.",
        score: 0,
      },
      abilityToSolveComplexIssues: {
        question:
          "Share an instance where you successfully resolved a complex issue.",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
    "Research And Project Experience": {
      qualityOfResearchWork: {
        question:
          "How would you describe the quality of your previous research or projects?",
        score: 0,
      },
      practicalExperience: {
        question:
          "What practical experiences do you have related to this field?",
        score: 0,
      },
      handsOnExperience: {
        question: "Can you elaborate on any hands-on experience you possess?",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
    "Communication Skills": {
      qualityOfSpeaking: {
        question: "How would you assess the quality of your speaking skills?",
        score: 0,
      },
      abilityToExplain: {
        question:
          "Provide an example of how you effectively explained a concept to others.",
        score: 0,
      },
      listeningSkills: {
        question:
          "How do you ensure effective listening during a conversation?",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
    "Leadership And Teamwork Abilities": {
      collaborativeWork: {
        question:
          "Provide an example of your contributions to a collaborative project.",
        score: 0,
      },
      leadershipPotential: {
        question: "Describe a time when you demonstrated leadership qualities.",
        score: 0,
      },
      collaborativeThinking: {
        question:
          "How do you approach brainstorming or problem-solving in teams?",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
    "General Aptitude": {
      willingnessToLearn: {
        question:
          "Can you share an instance where you quickly adapted or learned something new?",
        score: 0,
      },
      stressHandling: {
        question: "Describe how you manage stressful situations effectively.",
        score: 0,
      },
      generalDemeanor: {
        question:
          "How would others describe your general attitude and demeanor?",
        score: 0,
      },
      totalScore: 0,
      suggestions: "",
    },
  });

  return (
    <div className="flex justify-center bg-gray-100 w-full min-h-screen">
      <div className="bg-gray-100 flex flex-row gap-x-8 p-10 h-fit">
        {userData.map((user, index) => (
          <div
            key={index}
            className="max-w-[23vw] h-full bg-white rounded-xl  overflow-hidden"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
          >
            {/* User Card Header */}
            <div className="relative">
              {/* Background Image */}
              <img
                src={ai_image}
                className="w-full h-[20vh] object-cover"
                alt="AI Background"
              />

              {/* Back Button */}
              <div className="absolute top-4 left-4 w-8 h-8 cursor-pointer bg-white rounded-full p-2 shadow">
                <IoArrowUndo style={{ color: "3EB2F2" }} />
              </div>

              {/* User Image */}
              <div className="absolute top-[10vh] left-1/2 transform -translate-x-1/2 object-cover">
                <img
                  src={user_image}
                  alt={user.name}
                  className="w-28 h-28 rounded-full border-2 border-white shadow-lg"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-20">
              <h1 className="text-lg font-bold">{user.name}</h1>
              <p className="text-sm text-cyan-500">{user.email}</p>
              <p className="text-sm text-gray-500">{user.designation}</p>
            </div>

            {/* Documents */}
            <div className="p-5 flex flex-col gap-y-4">
              <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">Resume</h2>
                <a className="text-gray-700 " href={user.documents.resume}>
                  {user.documents.resume}
                </a>
              </div>
              <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">Cover Letter</h2>
                <a className="text-gray-700 " href={user.documents.coverLetter}>
                  {user.documents.coverLetter}
                </a>
              </div>
              <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">
                  Educational Certificates
                </h2>
                <ul className="list-disc pl-5">
                  {user.documents.educationalCertificates.map((cert, idx) => (
                    <li key={idx} className="text-gray-700">
                      <a href={cert} target="_blank" rel="noopener noreferrer">
                        {cert}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Work Experience */}
            <div className="p-5">
              <h2 className="text-gray-500 font-semibold mb-2">
                Work Experience:
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {user.workExperience.map((exp, idx) => (
                  <li key={idx}>
                    <strong>{exp.role}</strong> - {exp.company} ({exp.duration})
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="p-5">
              <h2 className="text-gray-500 font-semibold mb-2">Projects:</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {user.projects.map((project, idx) => (
                  <li key={idx}>{project}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-y-6">
          {Object.entries(interviewScores).map(
            ([sectionTitle, sectionData], index) => (
              <CandidateEvaluationSection
                key={index}
                sectionTitle={sectionTitle}
                evaluationCriteria={sectionData}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateEvaluation;
