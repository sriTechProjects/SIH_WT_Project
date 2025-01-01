import React, { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginForm from "./pages/LoginForm/LoginForm";
import ForgotPassword from "./pages/LoginForm/ForgotPassword";
import VerifyOTP from "./pages/LoginForm/VerifyOTP";
import ResetPassword from "./pages/LoginForm/ResetPassword";
import RacHeadDashboard from "./pages/RacHeadPages/RacHeadDashboard";
import RacHeadAnalytics from "./pages/RacHeadPages/RacHeadAnalytics";
import RacHeadPannels from "./pages/RacHeadPages/RacHeadPannels";
import CandidateCompleteDetail from "./pages/RegistrationForm/CandidateCompleteDetail";
import ExpertCompleteDetail from "./pages/RegistrationForm/ExpertCompleteDetail";
import ExpertRegistrationForm from "./pages/RegistrationForm/ExpertRegistration";
import ExpertRegistration from "./pages/RegistrationForm/ExpertRegistration";
import CandidateRegistration from "./pages/RegistrationForm/CandidateRegistration";
import RegistrationChoice from "./pages/RegistrationForm/RegistrationChoice";
import TwoFactorAuthentication from "./pages/LoginForm/TwoFactorAuthentication";
import CreatePanelForm from "./components/RacHeadComponents/CreatePanelForm";
import GeneratedExpertsPage from "./pages/RacHeadPages/GeneratedExpertsPage";
import CandidateQuizRedirect from "./pages/RegistrationForm/CanidateQuizRedirect";
import ExpertQuizRedirect from "./pages/RegistrationForm/ExpertQuizRedirect";
import CandidateDashboard2 from "./pages/CandidatePages/CandidateDashboard2";
import ExpertDashboard from "./pages/ExpertPages/ExpertDashboard";
import ExpertDetailsPage from "./pages/RacHeadPages/ExpertDetailsPage";
import CandidateListPage from "./pages/RacHeadPages/CandidateListPage";

import QuestionnareHome from "./pages/Questionnaire/QuestionnareHome";
import QuestionSectionPage from "./pages/Questionnaire/QuestionSectionPage";
import QuestionAnswerPage from "./pages/Questionnaire/QuestionAnswerPage";
import QuestionnareResultPage from "./pages/Questionnaire/QuestionnareResultPage";
// import PanelDetailsPage from "./pages/RacHeadPages/PanelDetailsPage";
// import ViewExpertPage from "./pages/RacHeadPages/ViewExpertPage";

import PerformanceReport from "./components/ReportLayout/PeformanceReport";

import {
  CandidateRoleContext,
  ExpertRoleContext,
  RequiredAuth,
} from "./routes/Layout";
import CandidateEvaluation from "./pages/ExpertPages/CandidateEvaluation";
import PanelDetails from "./pages/ExpertPages/PanelDetails";
import PanelAdvancedSettings from "./components/RacHeadComponents/PanelAdvancedSettings";
import PanelsPage from "./components/RacHeadComponents/RacHeadPannels";
import ExternalPanelsList from "./components/RacHeadComponents/ExternalPanelsList";

import { useSetDefaultLang } from "./hooks/UseSpeechToText";
import JobCreationForm from "./components/RacHeadComponents/JobCreationForm";
import UniversalLayout from "./routes/UniversalLayout";

// Create a Context for managing the sidebar state
export const SidebarContext = createContext();

const App = () => {
  useSetDefaultLang("en-US");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [totalScore, setTotalScore] = useState({
    "Problem Solving": 0,
    "Decision Making": 0,
    "Creative Thinking": 0,
    "Analytical Depth": 0,
    "Collaborative Thinking": 0,
  });

  const routes = createBrowserRouter([
    // Open Routes
    {
      path: "/",
      element: <UniversalLayout />,
      children: [
        { path: "/rachead/createPanel/:jobId", element: <CreatePanelForm /> },
        { path: "/expert/panneldetails", element: <PanelDetails /> },
        {
          path: "/expert/pannelAdvancedSettings/:jobId",
          element: <PanelAdvancedSettings />,
        },

        { path: "/", element: <LoginForm /> },
        { path: "/forgotPassword", element: <ForgotPassword /> },
        { path: "/verifyOtp", element: <VerifyOTP /> },
        {
          path: "/twofactorauthentication",
          element: <TwoFactorAuthentication />,
        },
        { path: "/registrationchoice", element: <RegistrationChoice /> },
        {
          path: "/register/candidateregister",
          element: <CandidateRegistration />,
        },
        { path: "/register/expertregister", element: <ExpertRegistration /> },
        { path: "/register/expert", element: <ExpertRegistrationForm /> },
        { path: "/resetpassword", element: <ResetPassword /> },
        { path: "/rachead/", element: <RacHeadDashboard /> },
        { path: "/rachead/analytics", element: <RacHeadAnalytics /> },
        { path: "/rachead/pannels", element: <RacHeadPannels /> },
        { path: "/rachead/getPannels/:jobId", element: <PanelsPage /> },
        { path: "/rachead/createPanel", element: <CreatePanelForm /> },
        { path: "/rachead/externalPanelList", element: <ExternalPanelsList /> },
        {
          path: "/rachead/generatedExperts/:panelID",
          element: <GeneratedExpertsPage />,
        },
        { path: "/rachead/expertsData", element: <ExpertDetailsPage /> },
        { path: "/rachead/candidateData", element: <CandidateListPage /> },
        { path: "/performanceReport", element: <PerformanceReport /> },
        { path: "/expert/dashboard/", element: <ExpertDashboard /> },
        { path: "/rachead/jobcreationform", element: <JobCreationForm /> },

        // Expert Authorized Routes
        {
          path: "/",
          element: <ExpertRoleContext />,
          children: [
            { path: "/register/expert/quiz", element: <ExpertQuizRedirect /> },
            // { path: "/expert/dashboard", element: <ExpertDashboard /> },
            {
              path: "/register/expertcompletedetail/:userId",
              element: <ExpertCompleteDetail />,
            },
            // { path: "/expert/panneldetails", element: <PanelDetails /> },
            {
              path: "/expert/candidateevaluation",
              element: <CandidateEvaluation />,
            },
          ],
        },

        // Candiate Authorized Routes
        {
          path: "/",
          element: <CandidateRoleContext />,
          children: [
            {
              path: "/register/candidate/quiz",
              element: <CandidateQuizRedirect />,
            },
            { path: "/candidate/dashboard", element: <CandidateDashboard2 /> },
            {
              path: "/register/candidatecompletedetail",
              element: <CandidateCompleteDetail />,
            },
          ],
        },

        // Login Authorized Routes
        {
          path: "/",
          element: <RequiredAuth />,
          children: [
            // { path: "/rachead/analytics", element: <RacHeadAnalytics /> },
            // { path: "/rachead/pannels", element: <RacHeadPannels /> },
            // { path: "/rachead/createPanel", element: <CreatePanelForm /> },
            // { path: "/rachead/generatedExperts", element: <GeneratedExpertsPage /> },
            // { path: "/rachead/expertsData", element: <ExpertDetailsPage/>},
            // { path: "/rachead/candidateData", element: <CandidateListPage/>},

            // questionaire section
            { path: "/questionnaire/", element: <QuestionnareHome /> },
            {
              path: "/questionnaire/questionsections",
              element: (
                <QuestionSectionPage
                  totalScore={totalScore}
                  setTotalScore={setTotalScore}
                />
              ),
            },
            {
              path: "/questionnaire/questionsection/quizpage",
              element: (
                <QuestionAnswerPage
                  totalScore={totalScore}
                  setTotalScore={setTotalScore}
                />
              ),
            },
            {
              path: "/questionnaire/resultpage",
              element: <QuestionnareResultPage totalScore={totalScore} />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <SidebarContext.Provider
      value={{ isSidebarCollapsed, setIsSidebarCollapsed }}
    >
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </SidebarContext.Provider>
  );
};

export default App;
