import React from "react";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";

const DashboardNumberCards = ({numberCardsStyle, title, para, Icon, value}) => {
  return (
    <Grid size={6} sx={numberCardsStyle}>
      <div className="flex justify-between">
        <div
          className="icon-box p-3 rounded-lg text-[#979797] bg-[#F9F9F9]"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          <Icon />
        </div>
        <Chip
          label="+ 0.07%"
          variant="filled"
          sx={{
            background: "#00B65E",
            color: "#fff",
            fontWeight: "600",
          }}
        />
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-[#3C8CE7] font-semibold text-sm">{title}</p>
          <h1 className="text-[#1E1E1E] font-bold text-3xl">{para}</h1>
        </div>
        <div></div>
      </div>
    </Grid>
  );
};

export default DashboardNumberCards;
