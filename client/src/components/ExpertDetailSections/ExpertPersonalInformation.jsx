import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

const ExpertPersonalInformation = ({ userData, setUserData }) => {
  const [errors, setErrors] = useState({
    age: "",
    email: "",
    phoneNo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear errors on user input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setUserData((prevStateData) => ({
      ...prevStateData,
      personalInfo: {
        ...prevStateData.personalInfo,
        [name]: value,
      },
    }));
  };

  const validateAge = () => {
    const age = userData.personalInfo.age;
    if (age <= 0 || isNaN(age)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age must be a positive number",
      }));
      return false;
    }
    if (age < 18 || age > 100) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age must be between 18 and 100",
      }));
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(userData?.personalInfo?.recoveryEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userData.personalInfo.phoneNo)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNo: "Phone number must be 10 digits",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let isValid = true;

    // Validate age, email, and phone number
    if (!validateAge() || !validateEmail() || !validatePhone()) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">1. Personal Information</h1>
      <div className="flex flex-col gap-7">
        {/* Name group */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-first-name"
            label="First Name"
            type="text"
            required
            name="firstName"
            value={userData?.personalInfo?.firstName}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            id="outlined-middle-name"
            label="Middle Name"
            type="text"
            name="middleName"
            value={userData?.personalInfo?.middleName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="outlined-last-name"
            label="Last Name"
            type="text"
            required
            name="lastName"
            value={userData?.personalInfo?.lastName}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </div>

        {/* Phone number and govt ID */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-phone-no"
            label="Phone No"
            type="number"
            required
            name="phoneNo"
            value={userData?.personalInfo?.phoneNo}
            onChange={handleInputChange}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
          />

          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="govt-id-type-label">Govt. ID Type</InputLabel>
            <Select
              labelId="govt-id-type-label"
              id="govt-id-type"
              label="Govt. ID Type"
              required
              name="govtIdType"
              value={userData?.personalInfo?.govtIdType}
              onChange={handleInputChange}
            >
              <MenuItem value="" disabled>
                Select Govt. ID Type
              </MenuItem>
              <MenuItem value="aadhaarcard">Aadhaar Card</MenuItem>
              <MenuItem value="pancard">Pan Card</MenuItem>
              <MenuItem value="drivinglicense">Driving License</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-govt-id-no"
            label="Govt ID No"
            type="text"
            required
            className="w-[50%]"
            name="govtIdNo"
            value={userData?.personalInfo?.govtIdNo}
            onChange={handleInputChange}
          />
        </div>

        {/* Gender, Age, Recovery Email */}
        <div className="w-full flex gap-3">
          <FormControl sx={{ flexWrap: "nowrap" }}>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-label"
              name="gender"
              value={userData?.personalInfo?.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <TextField
            id="outlined-age"
            label="Age"
            type="number"
            required
            name="age"
            value={userData?.personalInfo?.age}
            onChange={handleInputChange}
            error={!!errors.age}
            helperText={errors.age}
          />

          <TextField
            id="outlined-recovery-email"
            label="Recovery Email"
            type="email"
            required
            name="recoveryEmail"
            value={userData?.personalInfo?.recoveryEmail}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        {/* Designation, Field, and Years of Experience */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-designation"
            label="Designation"
            type="text"
            required
            name="designation"
            value={userData?.personalInfo?.designation}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <TextField
            id="outlined-field"
            label="Domain"
            type="text"
            required
            name="field"
            value={userData?.personalInfo?.field}
            onChange={handleInputChange}
            sx={{ flex: 1 }}
          />
          <FormControl variant="outlined" sx={{ flex: 1 }}>
            <InputLabel id="experience-label">Years of Experience</InputLabel>
            <Select
              labelId="experience-label"
              label="Years of Experience"
              id="experience"
              name="yearsOfExperience"
              value={userData?.personalInfo?.yearsOfExperience}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="" disabled>
                Select Years
              </MenuItem>
              {Array.from({ length: 41 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {i} {i === 1 ? "Year" : "Years"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default ExpertPersonalInformation;
