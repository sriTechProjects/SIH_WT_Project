import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LuClock } from "react-icons/lu";
import { Chip } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import pannelWallpaper from "../../assets/pannel_images/i2.jpg";
import { useNavigate } from "react-router-dom";

const PanelCards = ({ panel }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 320, maxHeight: "fit-content", borderRadius: "0.4rem" }}>
      <CardMedia sx={{ height: 180 }} image={pannelWallpaper} />
      <CardContent className="flex flex-col gap-y-3">
        <div className="content-header flex items-center justify-between">
          <div className="left flex flex-col gap-y-2">
            <h1 className="text-2xl font-semibold text-[#333]">
              {panel?.panelID}
            </h1>
            <p className="text-xs font-medium text-[#797979]">
              Dept. of AI & ML
            </p>
          </div>
          <div className="right">
            <Chip
              label="Completed"
              sx={{
                background: "rgba(97, 255, 178, 0.21)",
                border: "2px solid #00B65E",
                color: "#00B65E",
              }}
            />
          </div>
        </div>

        <div className="details-div flex items-center justify-between text-sm text-[#BBBBBB]">
          <span className="flex items-center gap-x-1">
            <LuClock />
            <p>
              <span className="text-[#464646] font-semibold">3</span> to{" "}
              <span className="text-[#464646] font-semibold">5</span> pm
            </p>
          </span>
          <span className="flex items-center gap-x-1">
            <MdGroups size={"1.4rem"} />
            <p>
              <span className="text-[#464646] font-semibold">
                {panel?.panelInfo?.panelExperts?.length}
              </span>{" "}
              experts
            </p>
          </span>
          <span className="flex items-center gap-x-1">
            <FaUser />
            <p>
              <span className="text-[#464646] font-semibold">
                {panel?.candidates?.length}
              </span>{" "}
              candidates
            </p>
          </span>
        </div>
      </CardContent>
      <CardActions
        sx={{
          padding: "1rem",
          paddingTop: "0.2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(`/rachead/generatedExperts/${panel?._id}`)}
          sx={{
            background: "#464646",
            textTransform: "capitalize",
            boxShadow: "none",
            padding: "0.6rem 1.4rem",
          }}
          className="hover:bg-[#333]"
        >
          View Details
        </Button>

        <div className="button-group flex items-center gap-x-4">
          <button className="rounded-full p-1 bg-[#eee]">
            <Tooltip title="Delete">
              <IconButton>
                <MdDelete />
              </IconButton>
            </Tooltip>
          </button>
          <button className="rounded-full p-1 bg-[#eee]">
            <Tooltip title="Edit">
              <IconButton>
                <FaEdit />
              </IconButton>
            </Tooltip>
          </button>
        </div>
      </CardActions>
    </Card>
  );
};

export default PanelCards;