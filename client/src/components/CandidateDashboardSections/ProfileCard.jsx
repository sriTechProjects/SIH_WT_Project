import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";

const ProfileCard = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, textAlign: "center", padding: 3 }}>
      <Avatar
        src="https://via.placeholder.com/100"
        sx={{ width: 100, height: 100, margin: "0 auto" }}
      />
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
        Rahul Rastogi
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
        rahul.rastogi@drdo.com
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        H.O.D - Dept. of AI & ML
      </Typography>
    </Card>
  );
};

export default ProfileCard;
