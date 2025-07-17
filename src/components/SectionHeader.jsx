import { Stack, Typography, Box } from "@mui/material";

const SectionHeader = ({ icon, heading }) => {
  return (
    <Stack alignItems="center" spacing={1} sx={{ marginBottom: "15px" }} direction="row">
      {icon && <Box
        component="img"
        alt="icon"
        height={{ xs: "25px", sm: "25px" }}
        width={{ xs: "25px", sm: "25px" }}
        sx={{
          filter:
            "invert(33%) sepia(64%) saturate(3272%) hue-rotate(195deg) brightness(93%) contrast(99%)",
        }}
        src={icon}
      />}
      <Typography variant="h3" sx={{ color: "primary.main" }}>
        {heading}
      </Typography>
    </Stack>
  );
};

export default SectionHeader;
