/* eslint-disable react/prop-types */
import { FormHelperText, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

const CustomInput = ({ label, input, required, textSx = {}, helperText, textAlign, helperColor }) => (
    <Grid container spacing={.5}>
        <Grid size={12}>
            <Typography variant="body2" sx={{ display: "flex", ...textSx }}>{label}  {required && <Typography variant="subtitle2" sx={{ color: "error.main" }}>*</Typography>}</Typography>
        </Grid>
        <Grid size={12}>
            {input}
            {helperText && <FormHelperText sx={{ fontSize: "14px", fontWeight: 400, textAlign: textAlign || "start", color: helperColor || '' }}>{helperText}</FormHelperText>}
        </Grid>
    </Grid >
);

export { CustomInput }