import React from "react";
import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CandidateQuizRedirect = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Redirect to quiz page
    navigate("/quiz");
  };

  const handleSkip = () => {
    // Redirect to dashboard or another page
    navigate("/expert/dashboard");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            width: 140,
            height: 140,
            background:
              "linear-gradient(145deg, rgba(0, 183, 238, 1), rgba(0, 119, 182, 1))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            marginBottom: 3,
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            animation: "bounce 2s infinite",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            sx={{
              animation: "pulse 1.5s infinite",
            }}
          >
            🎓
          </Typography>
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#0077b6"
          sx={{
            marginBottom: 1.5,
            textTransform: "capitalize",
          }}
        >
          Know Yourself Better!
        </Typography>
        <Typography
          variant="body1"
          color="#555"
          sx={{
            marginBottom: 4,
            lineHeight: 1.8,
          }}
        >
          Take a quick, interactive quiz to explore your interests and
          personality. It's fun, insightful, and only takes a few minutes!
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#0077b6",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#005f8d",
              },
              transition: "all 0.3s ease-in-out",
            }}
            onClick={handleNext}
          >
            Take Quiz
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#0077b6",
              color: "#0077b6",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                borderColor: "#005f8d",
                color: "#005f8d",
                backgroundColor: "#e0f7fa",
              },
              transition: "all 0.3s ease-in-out",
            }}
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CandidateQuizRedirect;