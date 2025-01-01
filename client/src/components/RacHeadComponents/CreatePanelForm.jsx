import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../styles/Loader";

const CreatePanelForm = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [preSet, setPreSet] = useState({});
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobID, setJobID] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.jobId;

  const [isLoading, setIsLoading] = useState(false);

  // Fetch job details using jobId
  const fetchPreDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/api/job/get/${jobId}`, {
        withCredentials: true,
      });
      const jobData = response?.data?.data || {};
      setPreSet(jobData);
      setJobTitle(jobData.jobTitle || "");
      setDescription(jobData.jobDescription || "");
      setJobID(jobData._id || "");
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  useEffect(() => {
    fetchPreDetails();
  }, [jobId]);

  // Navigate to the next page
  const handleNextPage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/expert/pannelAdvancedSettings/${jobID}`);
    }, 15000);
  };

  return (
    <main className="min-h-screen w-screen bg-[#eee] flex items-center justify-center py-8">
      {isLoading && <Loader />}
      <div className="form-page bg-white w-[80%] rounded-xl z-10 flex justify-center items-center py-8 px-12 md:w-2/4">
        <div className="box-content w-full">
          <h1 className="text-4xl text-[#333] font-semibold mb-12">
            Create New Panel: Step 1
          </h1>
          <form>
            <Grid
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem 0" }}
            >
              {/* Department */}
              <Grid item>
                <TextField
                  id="department"
                  label="Department"
                  variant="outlined"
                  fullWidth
                  value={preSet.domainDepartment || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Job Role */}
              <Grid item>
                <TextField
                  id="job-role"
                  label="Job Role"
                  variant="outlined"
                  fullWidth
                  value={preSet.jobRole || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Job Title */}
              <Grid item>
                <TextField
                  id="jobTitle"
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  value={jobTitle}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item>
                <TextField
                  label="Job Role Description"
                  multiline
                  rows={6}
                  fullWidth
                  value={description}
                  variant="outlined"
                  sx={{
                    "& textarea": {
                      resize: "none", // Disable resizing
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <div className="flex gap-x-4 mt-6">
              <Button
                variant="contained"
                sx={{
                  padding: "0.75rem 1.8rem",
                  width: "8rem",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  backgroundImage:
                    "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  "&:hover": {
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  },
                }}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePanelForm;
