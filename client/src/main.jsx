import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthenticationContext.jsx";
import { ListedJobsProvider } from "./context/RacHeadContexts/FetchListedJobs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ListedJobsProvider>
        <App />
      </ListedJobsProvider>
    </AuthContextProvider>
  </StrictMode>
);
