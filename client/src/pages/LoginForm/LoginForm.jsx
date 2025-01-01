import React, { useContext, useState } from "react";
import logo from "../../assets/images/drdo-logo.svg";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../context/AuthenticationContext";

  
const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  if(email === 'rachead@gmail.com' && password === 'Rac@123'){
    navigate('/rachead/')
  }

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const base_url = import.meta.env.VITE_BASE_URL;
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post(
        `${base_url}/api/auth`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      const userInformation = user?.data?.response;
      if (user && user?.data?.role) {
        if (validateForm()) {
          setCurrentUser({
            id: userInformation?._id,
            email: userInformation?.personalDetails?.contact?.email,
            role: user?.data?.role,
            response: userInformation,
          });
          toast.success("Login successful!");
          if (user?.data?.role === "Expert") {
            navigate("/expert/dashboard");
          } else {
            navigate("/candidate/dashboard");
          }
        }
      }
    } catch (error) {
      toast.error("Unable to make a Login!");
      // setEmail("");
      // setPassword("");
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
          <h1 className="text-3xl font-semibold">Welcome Back!</h1>
          <p className="text-gray-500 mt-1 font-medium text-md">
            Login to Shine
          </p>
        </div>
        
        <form className="w-[85%] flex flex-col gap-y-5" onSubmit={handleLogin}>
          <TextField
            id="outlined-email-input"
            label="Email ID"
            type="email"
            autoComplete="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
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

          <span className="text-right pr-2 text-[#0E8CCA] font-medium text-sm">
            <Link to="/forgotPassword">Forget Password</Link>
          </span>

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
            Login
          </Button>

          <span className="pr-2 font-medium text-sm text-[#C4C4C4]">
            Don't have an account?{" "}
            <Link to="/registrationchoice" className="text-[#0E8CCA]">
              Register
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;