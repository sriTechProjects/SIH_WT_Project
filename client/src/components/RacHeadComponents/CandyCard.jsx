import React from "react";
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

const CandyCard = ({ info }) => {
  console.log(info);
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
        <Avatar
          src={info?.expertName}
          sx={{ "--Avatar-size": "5rem" }}
        >{info?.candidateName[0]}</Avatar>
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -2.5,
            mb: 1,
            backgroundColor:
            (parseInt(info?.finalSkillScoreOutOf70 % 10) >= 0 && parseInt(info?.finalSkillScoreOutOf70 % 10) <= 4 )
                ? "#0E8CCA"
                : (parseInt(info?.finalSkillScoreOutOf70 % 10) >= 5 && parseInt(info?.finalSkillScoreOutOf70 % 10) <= 8 )
                ? "#00B65E"
                : "#FF0000",
            color: "#fff",
            py: 0.5,
            px: 1,
          }}
        >
          {
            (parseInt(info?.finalSkillScoreOutOf70 % 10) >= 0 && parseInt(info?.finalSkillScoreOutOf70 % 10) <= 4 ) ? "Cat-1" : (parseInt(info?.finalSkillScoreOutOf70 % 10) >= 5 && parseInt(info?.finalSkillScoreOutOf70 % 10) <= 8 ) ? "Cat-2" : "Cat-3"
          }
        </Chip>

        <Typography level="title-lg" sx={{ color: "#36CFEA" }}>
          {info?.candidateName}
        </Typography>
        {/* <Typography
          level="title-md"
          sx={{ color: "#676767", fontWeight: "500" }}
        >
          Head of Department
        </Typography> */}
        <Typography level="body2" sx={{ color: "#ACABAB" }}>
          {parseInt(info?.finalSkillScoreOutOf70 % 10)} years Experience
        </Typography>
        <Box sx={{ display: "flex", gap: "0 2rem", marginTop: "1rem" }}>
          {/* <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CircularProgress size="lg" determinate value={((info?.finalSkillScoreOutOf70 * 100)/70)}>
              <Typography level="body-sm">{`${parseInt(info?.finalSkillScoreOutOf70)}/70`}</Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Skill
            </Typography>
          </Stack> */}
          {/* <Stack spacing={1}>
            <CircularProgress size="lg" determinate value={((info?.approachRelevancyScoreOutOf30 * 100)/30)}>
              <Typography level="body-sm">
                {`${parseInt(info?.approachRelevancyScoreOutOf30)}/30`}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Approach
            </Typography>
          </Stack> */}
          <Stack spacing={1} sx={{ alignItems: "center", display:"flex" }}>
            <CircularProgress size="lg" determinate value={(info?.finalCombinedScoreOutOf100 )}>
              <Typography level="body-sm">
                {`${parseInt(info?.finalCombinedScoreOutOf100)}/100`}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Skill Relevancy Score
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CandyCard;
