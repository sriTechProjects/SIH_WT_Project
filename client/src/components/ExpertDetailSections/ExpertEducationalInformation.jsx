import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const ExpertEducationalInformation = ({ userData, setUserData }) => {
  const [educationEntry, setEducationEntry] = useState({
    degree: "",
    institution: "",
    yearOfAdmission: "",
    yearOfCompletion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    if (
      !educationEntry.degree ||
      !educationEntry.institution ||
      !educationEntry.yearOfAdmission ||
      !educationEntry.yearOfCompletion
    ) {
      toast.error("Please fill in all fields before adding education details.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      educationalInfo: [
        ...prev.educationalInfo,
        { ...educationEntry, id: new Date().getTime() },
      ],
    }));

    // Reset the form
    setEducationEntry({
      degree: "",
      institution: "",
      yearOfAdmission: "",
      yearOfCompletion: "",
    });

    toast.success("Education detail added successfully!");
  };

  const handleEditEducation = (id) => {
    const itemToEdit = userData.educationalInfo.find((item) => item.id === id);
    setEducationEntry(itemToEdit);
    handleRemoveEducation(id);
  };

  const handleRemoveEducation = (id) => {
    setUserData((prev) => ({
      ...prev,
      educationalInfo: prev.educationalInfo.filter((item) => item.id !== id),
    }));

    toast.info("Education detail removed.");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">
        2. Qualification Information
      </h1>
      <div className="flex flex-col gap-5">
        {/* Education Entry Form */}
        <div className="w-full flex gap-3 items-center">
          <TextField
            id="outlined-degree"
            label="Degree"
            type="text"
            name="degree"
            value={educationEntry.degree}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="outlined-institution"
            label="Institution"
            type="text"
            name="institution"
            value={educationEntry.institution}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="year-of-admission-label">
              Year of Admission
            </InputLabel>
            <Select
              labelId="year-of-admission-label"
              label="Year of Admission"
              id="year-of-admission"
              name="yearOfAdmission"
              value={educationEntry.yearOfAdmission}
              onChange={handleInputChange}
            >
              <MenuItem value="" disabled>
                Select Year
              </MenuItem>
              {Array.from({ length: 2030 - 1970 + 1 }, (_, i) => {
                const year = 1970 + i; // Start from 1970 and go to 2030
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="year-of-completion-label">
              Year of Completion
            </InputLabel>
            <Select
              labelId="year-of-completion-label"
              label="Year of Completion"
              id="year-of-completion"
              name="yearOfCompletion"
              value={educationEntry.yearOfCompletion}
              onChange={handleInputChange}
            >
              <MenuItem value="" disabled>
                Select Year
              </MenuItem>
              {Array.from({ length: 2030 - 1970 + 1 }, (_, i) => {
                const year = 1970 + i; // Start from 1970 and go to 2030
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEducation}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add
          </Button>
        </div>

        {/* Display Added Education */}
        <div className="mt-4">
          <Typography variant="h6" className="text-gray-700 mb-2">
            Added Education Details:
          </Typography>
          {userData.educationalInfo.length === 0 ? (
            <Typography variant="body1" className="text-gray-500">
              No education details added yet.
            </Typography>
          ) : (
            <div className="flex flex-col gap-3">
              {userData.educationalInfo.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 border rounded-md bg-gray-50 shadow"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <Typography
                      variant="body1"
                      className="font-medium w-1/4 truncate"
                    >
                      {item.degree}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="font-medium w-1/4 truncate"
                    >
                      {item.institution}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 w-1/4 truncate"
                    >
                      {item.yearOfAdmission}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 w-1/4 truncate"
                    >
                      {item.yearOfCompletion}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditEducation(item.id)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveEducation(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpertEducationalInformation;
