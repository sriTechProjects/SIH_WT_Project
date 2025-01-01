import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "core-js-pure/stable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../styles/Loader";

const PanelAdvancedSettings = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params?.jobId;

  const [totalExperts, setTotalExperts] = useState(0);
  const [noOfPanels, setNoOfPanels] = useState("");
  const [noOfExpertsPerPanel, setNoOfExpertsPerPanel] = useState("");
  const [interviewDate, setInterviewDate] = useState(null);
  const [criteriaData, setCriteriaData] = useState({
    "Skill Weight": { isSelected: true, detail: "" },
    "Experience Weight": { isSelected: true, detail: "" },
    "Qualification Weight": { isSelected: true, detail: "" },
    "Research Weight": { isSelected: true, detail: "" },
    "Project Weight": { isSelected: true, detail: "" },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTotalSelectedExperts = async () => {
      try {
        const response = await axios.post(
          `${base_url}/api/mlr/totalSelectedExperts`,
          { job_id: jobId },
          { withCredentials: true }
        );
        setTotalExperts(response?.data?.output || 0);
      } catch (error) {
        console.error("Error fetching Roles data:", error);
        toast.error("Failed to fetch total selected experts.");
      }
    };

    fetchTotalSelectedExperts();
  }, [jobId, base_url]);

  const handleJobUpdate = async () => {
    try {
      const response = await axios.post(
        `${base_url}/api/job/update/${jobId}`,
        {
          data: {
            noOfPanels: parseInt(noOfPanels),
            noOfExperts: parseInt(noOfExpertsPerPanel),
            interviewDate: interviewDate,
            SKILL_WEIGHT: parseInt(criteriaData?.["Skill Weight"].detail),
            EXPERIENCE_WEIGHT: parseInt(
              criteriaData?.["Experience Weight"].detail
            ),
            QUALIFICATION_WEIGHT: parseInt(
              criteriaData?.["Qualification Weight"].detail
            ),
            RESEARCH_WEIGHT: parseInt(criteriaData?.["Research Weight"].detail),
            PROJECT_WEIGHT: parseInt(criteriaData?.["Project Weight"].detail),
          },
        },
        { withCredentials: true }
      );

      if (response?.data?.success) {
        toast.success("Job Details Updated successfully!");
        setLoading(true);
        const mlPanelCreationResponse = await axios.post(
          `${base_url}/api/mlr/expertSelection`,
          { job_id: jobId },
          { withCredentials: true }
        );
        if (mlPanelCreationResponse) {
          toast.success("Panel Created successfully!");
          setLoading(false);
          navigate(`/rachead/getPannels/${jobId}`);
        } else {
          toast.error("Unable to Create Panel!");
          navigate("/rachead/createPanel");
        }
      }
    } catch (error) {
      console.error("Error fetching Roles data:", error);
      toast.error("Failed to fetch total selected experts.");
    }
  };

  const handleCriteriaChange = (key, field, value) => {
    setCriteriaData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    if (!noOfPanels || !noOfExpertsPerPanel || !interviewDate) {
      toast.error("Please fill all the required fields.");
      return false;
    }

    let isValid = true;
    const totalExpertsNeeded = noOfPanels * noOfExpertsPerPanel;

    if (totalExpertsNeeded > totalExperts) {
      toast.error(
        `Total experts required (${totalExpertsNeeded}) exceed available experts (${totalExperts}).
      `
      );
      isValid = false;
    }

    let totalPercentage = 0;
    Object.entries(criteriaData).forEach(([key, value]) => {
      if (value.isSelected) {
        const weight = parseFloat(value.detail);
        if (isNaN(weight) || weight <= 0 || weight > 100) {
          toast.error(`${key} should be between 1 and 100.`);
          isValid = false;
        }
        totalPercentage += weight || 0;
      }
    });

    if (totalPercentage > 100) {
      toast.error(
        `The total weight percentage (${totalPercentage}%) exceeds 100%.`
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSetDefaults = () => {
    setCriteriaData({
      "Skill Weight": { isSelected: true, detail: "40" },
      "Experience Weight": { isSelected: true, detail: "20" },
      "Qualification Weight": { isSelected: true, detail: "20" },
      "Research Weight": { isSelected: true, detail: "10" },
      "Project Weight": { isSelected: true, detail: "10" },
    });
    toast.success("Default values have been set.");
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleJobUpdate();
    }
  };

  return (
    <main className="min-h-screen w-screen bg-[#eee] flex items-center justify-center py-8">
      {loading && <Loader />}
      <div className="form-page bg-white w-[80%] rounded-xl z-10 flex justify-center items-center py-8 px-12 md:w-2/4">
        <div className="box-content w-full">
          <ToastContainer />
          <h1 className="text-4xl text-[#333] font-semibold mb-12">
            Expert Panel Summary
          </h1>
          <form>
            <Grid
              container
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem 0" }}
            >
              <div className="flex items-center gap-x-4">
                <p className="text-[#1c89c0] font-medium">
                  Available experts: {totalExperts}
                </p>
              </div>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
                <Grid size={4}>
                  <FormControl fullWidth>
                    <InputLabel id="panels-label">No. of Panels</InputLabel>
                    <Select
                      label="panels-label"
                      id="panels"
                      value={noOfPanels}
                      onChange={(e) => setNoOfPanels(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={4}>
                  <FormControl fullWidth>
                    <InputLabel id="experts-label">No. of Experts</InputLabel>
                    <Select
                      label="experts-label"
                      id="experts"
                      value={noOfExpertsPerPanel}
                      onChange={(e) => setNoOfExpertsPerPanel(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select a Date"
                      inputFormat="DD/MM/YYYY"
                      value={interviewDate}
                      onChange={(newDate) => setInterviewDate(newDate)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Accordion>
                <AccordionSummary expandIcon={<IoMdArrowDropdown />}>
                  <h1 className="font-semibold text-[#1c89c0] text-lg">
                    Advance Settings
                  </h1>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(criteriaData).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "3rem",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value.isSelected}
                            onChange={(e) =>
                              handleCriteriaChange(
                                key,
                                "isSelected",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={key}
                      />
                      {value.isSelected && (
                        <TextField
                          type="number"
                          value={value.detail}
                          onChange={(e) =>
                            handleCriteriaChange(key, "detail", e.target.value)
                          }
                          style={{ width: "8rem", marginLeft: "3rem" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Button
                variant="contained"
                onClick={handleSetDefaults}
                sx={{
                  background: "#89c9e9",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Set Default Weights
              </Button>
            </Grid>

            <div className="flex gap-x-4 mt-6">
              <Button
                variant="contained"
                onClick={() => navigate("/rachead/pannels")}
                sx={{
                  background: "#F9F9F9",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  color: "#464646",
                }}
              >
                Discard
              </Button>

              <Button
                variant="contained"
                onClick={handleFormSubmit}
                sx={{
                  backgroundImage:
                    "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
                  textTransform: "capitalize",
                  fontWeight: "600",
                }}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PanelAdvancedSettings;
