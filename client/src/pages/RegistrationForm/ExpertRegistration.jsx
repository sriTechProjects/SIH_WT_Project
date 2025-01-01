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
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExpertRegistration = () => {
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

  const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
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

    const strength = Object.values(checks).filter(
      (check) => check === true
    ).length;
    if (strength === 5) setPasswordStrength("Strong");
    else if (strength >= 3) setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  };

  const handleExpertRegister = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    }
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

    console.log("Email - ", email);
    console.log("Password - ", password);
    console.log(base_url);

    try {
      const response = await axios.post(
        `${base_url}/api/expert/signup`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response?.data?.success);
      console.log(response?.data?.data?._id);
      // Check if the registration was successful
      if (response?.data?.success) {
        const userId = response.data?.data?._id;
        if (userId) {
          console.log("User ID: ", userId); // Log the user ID
          toast.success("Expert registration successful!");
          navigate(`/register/expertcompletedetail/${userId}`);
        } else {
          toast.error("User ID not found after registration.");
        }
      } else {
        toast.error(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Registration Error: ", err);

      // Handle different types of errors, such as network issues
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed due to a network error.";
      toast.error(errorMessage);
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
          <h1 className="text-3xl font-semibold">Register as Expert!</h1>
        </div>
        <form className="space-y-5" onSubmit={handleExpertRegister}>
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>

          {/* Submit Buttons */}
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

export default ExpertRegistration;
