import React, { useState } from "react";
import logo from "../../assets/images/drdo-logo.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    return true;
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    if (validateEmail()) {
      toast.success("Password recovery email sent!");
      // Add logic to send email (e.g., API call)
    }
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center">
      <Toaster />
      <div className="form-div bg-white max-w-[500px] w-[90%] h-fit py-8 rounded-lg shadow-sm flex flex-col justify-center items-center gap-y-8 text-center">
        <div className="img-box flex items-center gap-x-3">
          <img src={logo} alt="drdo-logo" className="w-20" />
          <h1 className="text-2xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        </div>
        <div className="form-header">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <p className="text-gray-500 mt-1 font-medium text-md">
            Enter your registered email address, and we’ll send you a link to
            reset your password.
          </p>
        </div>

        <form className="w-[85%] flex flex-col gap-y-5" onSubmit={handleSendEmail}>
          <TextField
            id="outlined-email-input"
            label="Email ID"
            type="email"
            autoComplete="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            onClick={()=>{navigate('/verifyotp')}}
          >
            Send Email
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
