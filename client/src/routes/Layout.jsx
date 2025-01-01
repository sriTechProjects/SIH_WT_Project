import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";
import { Navigate, Outlet } from "react-router-dom";

export const RequiredAuth = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
    
  }
  console.log(currentUser.role);

  return !currentUser ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full min-h-screen flex justify-center items-start">
      <Outlet />
    </div>
  );
};

export const ExpertRoleContext = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return currentUser?.role !== "Expert" ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full min-h-screen flex justify-center items-start">
      <Outlet />
    </div>
  );
};

export const CandidateRoleContext = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return currentUser?.role !== "Candidate" ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full min-h-screen flex justify-center items-start">
      <Outlet />
    </div>
  );
};
