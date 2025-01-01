import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Chip,
  Box,
  Button,
  ButtonGroup,
  CardOverflow,
  CardActions,
  IconButton,
  Typography,
  SvgIcon,
  Stack,
  CircularProgress,
} from "@mui/joy";
import axios from "axios";

const ExpertsCard = ({ info, index }) => {
  const [otherInfo, setOtherInfo] = useState([]);
  const [randomDomain, setRandomDomain] = useState(null); // State to store the random domain

  const getRandomDomain = () => {
    const domains = ["IIT", "NIT"];
    return domains[Math.floor(Math.random() * domains.length)];
  };

  const base_url = import.meta.env.VITE_BASE_URL;

  const otherExpertInfo = async () => {
    try {
      const otherInformation = await axios.get(
        `${base_url}/api/expert/get/${info?.expertID}`,
        { withCredentials: true }
      );
      if (otherInformation) {
        setOtherInfo(otherInformation?.data?.data);
        console.log(otherInformation?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    otherExpertInfo();
  }, [info]);

  // Initialize randomDomain state only once
  useEffect(() => {
    if (randomDomain === null) {
      setRandomDomain(getRandomDomain());
    }
  }, [randomDomain]);

  return (
    <Card
      sx={{
        width: 280,
        maxWidth: "100%",
        height: "fit-content",
        backgroundColor: "#FDFDFD",
        border: "1px solid #D6D6D6",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={info?.expertName} sx={{ "--Avatar-size": "5rem" }}>
          {info?.expertName[0]}
        </Avatar>
        <Chip
          size="md"
          variant="soft"
          color="primary"
          sx={{
            mt: -2.5,
            mb: 1,
            border: "3px solid",
            backgroundColor:
              info?.domain === 'DRDO'
                ? "#0E8CCA"
                : info?.domain === "NIT Delhi"
                ? "#00B65E"
                : "#FF0000",
            color: "#fff",
            py: 0.5,
            px: 1,
          }}
        >
          {info?.domain}
        </Chip>

        <Typography level="title-lg" sx={{ color: "#36CFEA" }}>
          {info?.expertName}
        </Typography>
        {/* <Typography
          level="title-md"
          sx={{ color: "#676767", fontWeight: "500" }}
        >
          {index === 0 ? "DRDO" : randomDomain}
        </Typography> */}
        <Typography level="body2" sx={{ color: "#ACABAB" }}>
          {otherInfo?.fieldOfExpertise?.yearsOfExperience} Years of Experience
        </Typography>
        <Box sx={{ display: "flex", gap: "0 2rem", marginTop: "1rem" }}>
          {/* <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CircularProgress
              size="lg"
              determinate
              value={
                (otherInfo?.skillRelevancyScore?.totalSkillRelevancyScore *
                  100) /
                70
              }
            >
              <Typography level="body-sm">
                {`${parseInt(
                  otherInfo?.skillRelevancyScore?.totalSkillRelevancyScore
                )}/70`}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Skill Score
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <CircularProgress
              size="lg"
              determinate
              value={
                (otherInfo?.approachRelevancyScore
                  ?.totalApproachRelevancyScore *
                  100) /
                30
              }
            >
              <Typography level="body-sm">
                {`${parseInt(
                  otherInfo?.approachRelevancyScore?.totalApproachRelevancyScore
                )}/30`}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Approach Score
            </Typography>
          </Stack> */}
          <Stack spacing={1} sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <CircularProgress
              size="lg"
              determinate
              value={otherInfo?.finalScore}
            >
              <Typography level="body-sm">{`${parseInt(
                otherInfo?.finalScore
              )}/100`}</Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333", textAlign: "center" }}>
              Total Skill Relevancy Score
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertsCard;
