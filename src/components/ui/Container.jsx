import { Box } from "@mui/material";

const Container = ({ children, sx }) => {
  return (
    <Box
      width="100%"
      maxWidth={{ xs: "95vw", md: "90vw", xl: "85vw" }}
      className="test2"
      px={{ xs: "0px", md: "1.5rem" }}
      py={{ xs: "1.5rem", md: "2rem" }}
      sx={{ margin: "0px auto", ...sx }}
    >
      {children}
    </Box>
  );
};
export default Container;
