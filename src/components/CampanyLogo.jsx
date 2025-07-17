import PropTypes from "prop-types";
import { Box, Stack } from "@mui/material";
import CompanyImg from "../assets/companyLogo.svg";
import Logo from "../assets/ticketsQue.svg";
import { navHeight } from "../../config-global";
const CompanyLogo = ({ open }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "18px",
        height: navHeight,
      }}
    >
      {open ? (
        <Box
          component="img"
          src={"/logo.svg"}
          alt="Icon"
          sx={{ maxHeight: "100%" }}
        />
      ) : (
        <Box component="img" src={"/half_logo.svg"} alt="Icon" sx={{ maxHeight: "100%" }} />
      )}
    </Stack>
  );
};

CompanyLogo.propTypes = {
  open: PropTypes.bool,
};

export default CompanyLogo;
