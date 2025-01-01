import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const ExpertAdditionalInputs = ({ userData, setUserData }) => {
  const [projectEntry, setProjectEntry] = useState({
    title: "",
    description: "",
    skills: "",
  });

  const [publicationEntry, setPublicationEntry] = useState({
    title: "",
    link: "",
    year: "",
    skills: "",
  });

  const handleInputChange = (e, setEntry) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a project
  const handleAddProject = () => {
    if (!projectEntry.title || !projectEntry.description || !projectEntry.skills) {
      toast.error("Please fill all project fields.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        projects: [
          ...prev.additionalInputs.projects,
          { ...projectEntry, id: new Date().getTime() },
        ],
      },
    }));

    setProjectEntry({ title: "", description: "", skills: "" });
  };

  // Add a publication
  const handleAddPublication = () => {
    if (!publicationEntry.title || !publicationEntry.link || !publicationEntry.year || !publicationEntry.skills) {
      toast.error("Please fill all publication fields.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        publications: [
          ...prev.additionalInputs.publications,
          { ...publicationEntry, id: new Date().getTime() },
        ],
      },
    }));

    setPublicationEntry({ title: "", link: "", year: "", skills: "" });
  };

  // Remove a project or publication
  const handleRemoveItem = (type, id) => {
    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        [type]: prev.additionalInputs[type].filter((item) => item.id !== id),
      },
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0077b6]">4. Additional Inputs</h1>
      <div className="overflow-y-auto">
        {/* Projects */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Projects
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Title"
              name="title"
              value={projectEntry.title}
              onChange={(e) => handleInputChange(e, setProjectEntry)}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={projectEntry.description}
              onChange={(e) => handleInputChange(e, setProjectEntry)}
              fullWidth
            />
            <TextField
              label="Skills Gained"
              name="skills"
              value={projectEntry.skills}
              onChange={(e) => handleInputChange(e, setProjectEntry)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddProject}>
              Add
            </Button>
          </div>
          {userData.additionalInputs.projects?.map((project) => (
            <div
              key={project.id}
              className="flex justify-between items-center bg-blue-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                <strong>{project.title}</strong>: {project.description} <br />
                Skills Gained: {project.skills}
              </Typography>
              <Tooltip title="Remove">
                <IconButton onClick={() => handleRemoveItem("projects", project.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>

        {/* Research Papers/Publications */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Research Papers/Publications
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Title"
              name="title"
              value={publicationEntry.title}
              onChange={(e) => handleInputChange(e, setPublicationEntry)}
              fullWidth
            />
            <TextField
              label="Link"
              name="link"
              value={publicationEntry.link}
              onChange={(e) => handleInputChange(e, setPublicationEntry)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="publication-year-label">Year</InputLabel>
              <Select
                labelId="publication-year-label"
                label="Year"
                name="year"
                value={publicationEntry.year}
                onChange={(e) => handleInputChange(e, setPublicationEntry)}
              >
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {Array.from({ length: 2030 - 1970 + 1 }, (_, i) => {
                  const year = 1970 + i;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Skills"
              name="skills"
              value={publicationEntry.skills}
              onChange={(e) => handleInputChange(e, setPublicationEntry)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddPublication}>
              Add
            </Button>
          </div>
          {userData.additionalInputs.publications?.map((pub) => (
            <div
              key={pub.id}
              className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                <strong>{pub.title}</strong> ({pub.year}) <br />
                Skills: {pub.skills}
              </Typography>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "10px", color: "blue", textDecoration: "underline" }}
              >
                View Publication
              </a>
              <Tooltip title="Remove">
                <IconButton onClick={() => handleRemoveItem("publications", pub.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ExpertAdditionalInputs;
