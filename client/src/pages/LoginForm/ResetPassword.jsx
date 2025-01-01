import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import logo from "../../assets/images/drdo-logo.svg";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordChecks, setNewPasswordChecks] = useState({
    isLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [newPasswordStrength, setNewPasswordStrength] = useState(""); // weak, medium, strong
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () =>
    setShowNewPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Validate new password and calculate strength
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (!value) {
      // Reset everything if the new password field is cleared
      setNewPasswordChecks({
        isLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
      });
      setNewPasswordStrength("");
      return;
    }

    const checks = {
      isLength: value.length >= 8,
      hasUpper: /[A-Z]/.test(value),
      hasLower: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    setNewPasswordChecks(checks);

    const strength =
      Object.values(checks).filter((check) => check === true).length;
    if (strength === 5) setNewPasswordStrength("Strong");
    else if (strength >= 3) setNewPasswordStrength("Medium");
    else setNewPasswordStrength("Weak");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if fields are empty
    if (!currentPassword.trim() || !newPassword.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as the current password!");
      return;
    }

    if (newPasswordStrength !== "Strong") {
      toast.error("New password is not strong enough!");
      return;
    }

    toast.success("Password changed successfully!");
    navigate("/");
  };

  return (
    <main className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-6">
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Current Password Field */}
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-current-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle current password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showCurrentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
          </div>

          {/* New Password Field */}
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-new-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>

            {/* New Password Validation Checklist */}
            <div className="text-sm mt-2">
              <span
                className={
                  newPasswordChecks.isLength ? "text-green-600" : "text-gray-600"
                }
              >
                At least 8 characters
              </span>
              <br />
              <span
                className={
                  newPasswordChecks.hasUpper ? "text-green-600" : "text-gray-600"
                }
              >
                At least one uppercase letter
              </span>
              <br />
              <span
                className={
                  newPasswordChecks.hasLower ? "text-green-600" : "text-gray-600"
                }
              >
                At least one lowercase letter
              </span>
              <br />
              <span
                className={
                  newPasswordChecks.hasNumber ? "text-green-600" : "text-gray-600"
                }
              >
                At least one number
              </span>
              <br />
              <span
                className={
                  newPasswordChecks.hasSpecial
                    ? "text-green-600"
                    : "text-gray-600"
                }
              >
                At least one special character (@$!%*?&)
              </span>
            </div>

            {/* New Password Strength Meter */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-2 rounded-md">
                <div
                  className={`h-2 rounded-md ${
                    newPasswordStrength === "Strong"
                      ? "bg-green-500 w-full"
                      : newPasswordStrength === "Medium"
                      ? "bg-orange-500 w-2/3"
                      : newPasswordStrength === "Weak"
                      ? "bg-red-500 w-1/3"
                      : "bg-gray-200 w-0"
                  }`}
                ></div>
              </div>
              <span className="text-sm">
                {newPasswordStrength && `Strength: ${newPasswordStrength}`}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0E8CCA] text-white py-2 px-4 rounded hover:bg-[#0969A3] transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
