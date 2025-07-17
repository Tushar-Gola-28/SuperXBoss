import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const Pagination = ({ page, setPage, totalPages, setTabDataCheck }) => {
  const handlePageChange = (e) => {
    setPage(e.target.value - 1);
    if (setTabDataCheck) {
      setTabDataCheck({
        active_cards: false,
        inactive_cards: false,
        registered_cards: false,
      });
    }
  };
  const handleDecrement = () => {
    setPage((prev) => prev - 1);
    if (setTabDataCheck) {
      setTabDataCheck({
        active_cards: false,
        inactive_cards: false,
        registered_cards: false,
      });
    }
  };
  const handleIncrement = () => {
    setPage((prev) => prev + 1);
    if (setTabDataCheck) {
      setTabDataCheck({
        active_cards: false,
        inactive_cards: false,
        registered_cards: false,
      });
    }
  };

  return (
    <Stack alignItems="center" gap={1} direction="row">
      <IconButton
        color="primary"
        sx={{ width: "35px", height: "35px" }}
        disabled={page + 1 === 1}
        onClick={handleDecrement}
      >
        <KeyboardArrowLeftOutlined />{" "}
      </IconButton>
      <Typography sx={{ color: "primary.main" }} variant="body2">
        Page
      </Typography>
      <FormControl>
        <Select
          className="custom-select"
          sx={{
            "&.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.custom-select":
            {
              height: "37px",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
              },
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={page + 1}
          onChange={handlePageChange}
          color="primary"

          renderValue={() => (
            <Typography color="primary" variant="body2">
              {page + 1}
            </Typography>
          )}
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <MenuItem key={pageNumber} value={pageNumber}>
                {pageNumber}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <Typography
        sx={{ color: "primary.main" }}
        variant="body2"
      >{`of ${totalPages}`}</Typography>

      <IconButton
        color="primary"
        sx={{ width: "35px", height: "35px" }}
        disabled={page + 1 === totalPages}
        onClick={handleIncrement}
      >
        {" "}
        <KeyboardArrowRightOutlined />{" "}
      </IconButton>
    </Stack>
  );
};

export { Pagination }
