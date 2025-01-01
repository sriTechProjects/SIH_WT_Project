import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Tooltip, IconButton } from "@mui/material";
import { MdDelete, MdGroups } from "react-icons/md";
import { FaEdit, FaUser } from "react-icons/fa";
import pannelWallpaper from "../../assets/pannel_images/i1.jpg";
import { useNavigate } from "react-router-dom";

const JobsCards = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling job description
  const navigate = useNavigate();

  // Helper function to truncate text
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")}...`;
    }
    return text;
  };

  return (
    <Card
      sx={{
        width: 320,
        minHeight: 230,
        
        borderRadius: "0.4rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ height: 120, flexShrink:0 }} image={pannelWallpaper} />
      <div className="flex flex-col flex-1">
        <CardContent className="flex flex-col gap-y-3 flex-1">
          {/* Header Section */}
          <div className="content-header flex items-center justify-between">
            <div className="left flex flex-col gap-y-2">
              <h1 className="text-xl font-semibold text-[#333]">
                {job?.jobRole}
              </h1>
              <p className="text-xs font-medium text-[#797979]">
                {job?.domainDepartment}
              </p>
            </div>
            {/* <div className="right">
              <Chip
                label="Completed"
                sx={{
                  background: "rgba(97, 255, 178, 0.21)",
                  border: "2px solid #00B65E",
                  color: "#00B65E",
                }}
              />
            </div> */}
          </div>

          {/* Description Section */}
          <div className="content-para text-sm text-[#646464] text-justify">
            <p>
              {isExpanded
                ? job?.jobDescription
                : truncateText(job?.jobDescription || "", 10)}
              {job?.jobDescription?.split(" ").length > 10 && (
                <span
                  className="font-semibold text-[#3C8CE7] cursor-pointer ml-1"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </span>
              )}
            </p>
          </div>
        </CardContent>

        {/* Actions Section */}
        <CardActions
          sx={{
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#464646",
              textTransform: "capitalize",
              boxShadow: "none",
              padding: "0.6rem 1.4rem",
            }}
            onClick={() => navigate(`/rachead/getPannels/${job?._id}`)}
          >
            View Panels
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
      </div>
    </Card>
  );
};

export default JobsCards;
