import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const FetchListedJobs = createContext();

export const ListedJobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_BASE_URL;

  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${base_url}/api/job/all`, {
          withCredentials: true,
        });
        if (response?.data?.success) {
          const listedJobs = response?.data?.data;
          setJobs(listedJobs);
          setRole(listedJobs?.jobRole);
          setTitle(listedJobs?.jobTitle);
          setDepartment(listedJobs?.domainDepartment);
          setDescription(listedJobs?.jobDescription);
          console.log(listedJobs);
        }
      } catch (error) {
        console.error("Error fetching user info, please re-login.", error);
        setJobs(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [base_url]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <FetchListedJobs.Provider
      value={{
        jobs,
        setJobs,
        loading,
        setLoading,
        role,
        title,
        department,
        description,
      }}
    >
      {children}
    </FetchListedJobs.Provider>
  );
};
