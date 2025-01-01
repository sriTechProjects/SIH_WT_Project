import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/drdo-logo.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast, Toaster } from "react-hot-toast";

const TwoFactorAuthentication = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next field
      if (value !== "" && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (otp.includes("")) {
      toast.error("All OTP fields must be filled!");
      return;
    }

    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      toast.error("Please enter a valid 4-digit OTP!");
      return;
    }

    toast.success("OTP Verified Successfully!");
    // Add OTP verification logic here (e.g., API call)
    navigate(""); // Navigate to Reset Password page
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center">
      <Toaster />
      <div className="form-div bg-white max-w-[500px] w-[90%] h-fit px-5 py-8 rounded-lg shadow-sm flex flex-col justify-center items-center gap-y-8 text-center">
        <div className="img-box flex items-center gap-x-3">
          <img src={logo} alt="drdo-logo" className="w-20" />
          <h1 className="text-2xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        </div>
        <div className="form-header flex flex-col gap-y-4">
          <h1 className="text-3xl font-semibold">Authenticate Your Account</h1>
          <p className="text-gray-500 mt-1 font-normal text-[0.9rem]">
            Protecting your information is our top priority. Please confirm your account by entering the authorization code sent to  am**********@gmail.com
          </p>
        </div>

        <form className="w-[85%] flex flex-col gap-y-8" onSubmit={handleSubmit}>
          <div className="otp-box flex justify-center gap-x-4">
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                  },
                }}
                sx={{
                  width: "60px",
                  "& .MuiInputBase-root": {
                    fontSize: "1.5rem",
                  },
                }}
              />
            ))}
          </div>

          <Button
            type="submit"
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
            Verify OTP
          </Button>
          <span className="pr-2 font-medium text-sm text-[#333]">
            Haven't received the code? {" "}
            <button className="text-[#0E8CCA]">
              Resend it
            </button>
          </span>
        </form>
      </div>
    </main>
  );
};

export default TwoFactorAuthentication;
