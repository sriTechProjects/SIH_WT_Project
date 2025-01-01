import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import '../../styles/RacHeadStyle.css';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSpeechToText } from "../../hooks/UseSpeechToText";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa";
import { color } from '@mui/system';

const JobCreationForm = () => {
    const [isManual, setIsManual] = useState(true);
    const [formData, setFormData] = useState({});
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [fileNames, setFileNames] = useState([]);
    const description = useSpeechToText("");

    const handleChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files).map((file) => file.name); // Get file names
        setFileNames(fileArray); // Update the state with file names
    };

    const handleFileUploadpdf = (event) => {
        const files1 = event.target.files;
        const fileArray1 = Array.from(files1).map((file1) => file1.name); // Get file names
        setFileNames(fileArray1); // Update the state with file names
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            setTags((prev) => [...prev, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
    };

    return (
        <main className="h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center overflow-hidden">
            <div className="form-div bg-white w-[80%] h-fit py-8 rounded-lg shadow-sm flex flex-col justify-center items-center gap-y-8 text-center p-4 mb-6 mt-6">
                <h1 className='font-semibold text-3xl text-cyan-500'>Create Job Application</h1>
                <div className='flex  w-full h-18 bg-white border border-2 rounded-lg items-center'>
                    <h1 className='p-4 text-slate-800'>Create Job automatically by uploading pdf</h1>
                    <div className='flex w-40 h-12 ml-auto overflow-hidden'>

                        <Button
                            component="label"
                            variant="contained"
                            sx={{
                                backgroundColor: "#0e8cca",
                                padding: "0.8em 1rem",
                                fontWeight: 600,
                                textTransform: "capitalize",
                                letterSpacing: "2px",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                            }}
                        >
                            Upload PDF
                            <input
                                type="file"
                                accept="application/pdf"
                                hidden
                                onChange={handleFileUploadpdf}
                            />
                        </Button>
                        {fileNames.length > 0 && (
                            <div>{fileNames.join(", ")}</div>
                        )}
                    </div>


                </div>

                <div className="w-full px-4 mt-6">
                    {isManual ? (
                        <form className="flex flex-col gap-y-4 w-full">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        id="JobTitle"
                                        label="Job Title"
                                        type="title"
                                        autoComplete="job title"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="JobRole"
                                        label="Job Role"
                                        type="role"
                                        autoComplete="role"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{ margin: "1px 0", display: "flex", flexDirection: "column" }}>
                                        <select
                                            id="department"
                                            value={selectedDepartment}
                                            onChange={handleChange}
                                            style={{
                                                padding: "17px",
                                                fontSize: "16px",
                                                borderRadius: "4px",
                                                border: "1px solid #ccc",
                                                width: "100%",
                                                color: "gray",
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Department
                                            </option>
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                        {selectedDepartment && (
                                            <p style={{ marginTop: "10px" }}>
                                                Selected Department: <strong>{selectedDepartment}</strong>
                                            </p>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="JobDescription"
                                        label="Job Description"
                                        type="description"
                                        autoComplete="description"
                                        value={description.value}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        onChange={(e) => {description.setValue(e.target.value)
                                            setInputValue(e.target.value)
                                            }}                                
                                        InputProps={{
                                            endAdornment: (
                                                <>{true && <InputAdornment position="end">
                                                    <IconButton sx={{ fontSize: "1.2rem" }} onClick={description.toggleListening}>
                                                        {description.isListening ? (
                                                            <FaMicrophoneSlash style={{
                                                                color: "red"
                                                            }} />
                                                        ) : (
                                                            <FaMicrophone />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>}</>
                                            ),
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <TextField
                                            label="Responsibilities"
                                            variant="outlined"
                                            fullWidth
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Press Enter to add responsibility"
                                        />
                                        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                                            {tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    onDelete={() => handleDeleteTag(tag)}
                                                    color="primary"
                                                />
                                            ))}
                                        </Box>

                                        <Box mt={2}>
                                            <Button
                                                component="label"
                                                variant="contained"
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload files
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={handleFileUpload}
                                                />
                                            </Button>
                                            {fileNames.length > 0 && (
                                                <div>{fileNames.join(", ")}</div>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={4}>
                                    <TextField
                                        id="MinQualification"
                                        label="Minimum Qualification"
                                        type="qualification"
                                        autoComplete="qualification"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id="Experience"
                                        label="Experience (yrs)"
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid xs={3} sx={{ marginLeft: "18px", marginTop: "12px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Application Deadline"
                                            value={formData.applicationDeadline}
                                            onChange={(newValue) =>
                                                setFormData({ ...formData, applicationDeadline: newValue })
                                            }
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                            </Grid>

                            <Grid container spacing={2} mt={1} >


                                <Grid xs={4} sx={{ marginRight: "0", marginLeft: "auto" }}>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#0e8cca",
                                            padding: "0.8em 1rem",
                                            fontWeight: 600,
                                            textTransform: "capitalize",
                                            letterSpacing: "2px",
                                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                                        }}
                                    >
                                        Create Job
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    ) : (
                        <Box>
                            <h3>Extracted Details:</h3>
                        </Box>
                    )}
                </div>
            </div>
        </main>
    );
};

export default JobCreationForm;