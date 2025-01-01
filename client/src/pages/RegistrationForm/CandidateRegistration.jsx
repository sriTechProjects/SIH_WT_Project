import React, { useState } from "react";
import logo from "../../assets/images/drdo-logo.svg";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CandidateRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    isLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(""); // weak, medium, strong
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Validate password and calculate strength
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      // Reset everything if the password field is cleared
      setPasswordChecks({
        isLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
      });
      setPasswordStrength("");
      return;
    }

    const checks = {
      isLength: value.length >= 8,
      hasUpper: /[A-Z]/.test(value),
      hasLower: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    setPasswordChecks(checks);

    const strength =
      Object.values(checks).filter((check) => check === true).length;
    if (strength === 5) setPasswordStrength("Strong");
    else if (strength >= 3) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Validate email
    if (!email) {
      toast.error("Email is required!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return;
    }
  
    // Validate password fields
    if (!password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (passwordStrength !== "Strong") {
      toast.error("Password is not strong enough!");
      return;
    }
  
    // If all validations pass
    try {
      const response = await axios.post("http://localhost:8000/api/candidate/signup", {
        email,
        password,
      });
  
      // Assuming response contains a success message or user data
      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate(`/register/candidatecompletedetail?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(response.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log the full error object
  
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response data:", error.response.data);
        toast.error(
          error.response.data?.message || `Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request data:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else happened
        console.error("Error message:", error.message);
        toast.error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };
  
  

  return (
    <main className="h-screen w-screen bg-gray-100 flex justify-center items-center shadow-sm">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="drdo-logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold text-[#0E8CCA] ml-3">E.B.R.S.</h1>
        </div>
        <div className="form-header text-center mb-5">
          <h1 className="text-3xl font-semibold">Register as Candidate!</h1>
        </div>
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Email Field */}
          <TextField
            id="outlined-email-input"
            label="Email ID"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            fullWidth
          />

          {/* Password Field */}
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {/* Password Validation Checklist */}
            <div className="text-sm mt-2">
              <span
                className={
                  passwordChecks.isLength ? "text-green-600" : "text-gray-600"
                }
              >
                At least 8 characters
              </span>
              <br />
              <span
                className={
                  passwordChecks.hasUpper ? "text-green-600" : "text-gray-600"
                }
              >
                At least one uppercase letter
              </span>
              <br />
              <span
                className={
                  passwordChecks.hasLower ? "text-green-600" : "text-gray-600"
                }
              >
                At least one lowercase letter
              </span>
              <br />
              <span
                className={
                  passwordChecks.hasNumber ? "text-green-600" : "text-gray-600"
                }
              >
                At least one number
              </span>
              <br />
              <span
                className={
                  passwordChecks.hasSpecial ? "text-green-600" : "text-gray-600"
                }
              >
                At least one special character (@$!%*?&)
              </span>
            </div>

            {/* Password Strength Meter */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-2 rounded-md">
                <div
                  className={`h-2 rounded-md ${
                    passwordStrength === "Strong"
                      ? "bg-green-500 w-full"
                      : passwordStrength === "Medium"
                      ? "bg-orange-500 w-2/3"
                      : passwordStrength === "Weak"
                      ? "bg-red-500 w-1/3"
                      : "bg-gray-200 w-0"
                  }`}
                ></div>
              </div>
              <span className="text-sm">
                {passwordStrength && `Strength: ${passwordStrength}`}
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0E8CCA] text-white py-2 px-4 rounded hover:bg-[#0969A3] transition-all"
          >
            Register
          </button>

          {/* Already have an account */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default CandidateRegistration;