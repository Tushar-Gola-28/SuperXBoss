import { Stack, Typography, Box } from "@mui/material";
import event_cancel from "../assets/preveiw_cancel.svg";
import BackArrow from "../assets/backArrow.svg";
import { useNavigate } from "react-router";
const SectionHeader = ({ icon, heading, }) => {
  const navigate = useNavigate()
  return (
    <Stack alignItems="center" spacing={1} sx={{ marginBottom: "15px" }} direction="row">
      {<Box
        component="img"
        alt="icon"
        height={{ xs: "25px", sm: "25px" }}
        width={{ xs: "25px", sm: "25px" }}
        sx={{
          filter:
            icon ? "invert(33%) sepia(64%) saturate(3272%) hue-rotate(195deg) brightness(93%) contrast(99%)" : "",
          cursor: icon ? "" : "pointer"
        }}
        onClick={() => icon ? {} : navigate(-1)}

        src={icon ? icon : BackArrow}
      />}
      <Typography variant="h3" sx={{ color: "primary.main" }}>
        {heading}
      </Typography>
    </Stack>
  );
};

export default SectionHeader;
