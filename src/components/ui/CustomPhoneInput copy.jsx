import React from 'react';
import { FormControl, TextField, IconButton, Popover, MenuItem, Typography, Grid2 } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomPhoneInput = ({ code, setCode, phoneNumberLength, validCountryDataList, filteredMenuItems, anchorEl, handleCode, handleCountryCode, handleSearchTextChange, handleMenuClose, searchText, value, handleChange }) => {
    return (
        <Grid2 container spacing={1}>
            {/* Country Code Field */}
            <Grid2 size={{ xs: 3, md: 2 }}>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="91"
                    value={code?.includes("+") ? code?.slice(1) : code}
                    name="code"
                    onChange={handleCode}
                    inputProps={{
                        maxLength: 3,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        style: { padding: "0px", fontSize: "0.8rem", minHeight: "44px", textAlign: "center" },
                        onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ""),
                    }}
                    required
                    InputProps={{
                        endAdornment: (
                            <IconButton sx={{ p: 0, cursor: "pointer" }} onClick={handleCountryCode}>
                                <ArrowDropDownIcon />
                            </IconButton>
                        ),
                        startAdornment: <Typography variant="h5" sx={{ p: 0 }}>+</Typography>,
                    }}
                />
                {/* Country Code Selector Popover */}
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    sx={{ mt: 3, maxHeight: 270 }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        fullWidth
                        size="small"
                        sx={{ p: 1, position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#FFFFFF" }}
                        onChange={handleSearchTextChange}
                    />
                    {/* Display List of Country Codes */}
                    {(searchText ? filteredMenuItems : validCountryDataList)?.map((item) => (
                        <MenuItem key={item?.name} value={item.code} onClick={() => {
                            setCode(item?.code);
                            setPhoneNumberLength(item?.phoneLength);
                            handleMenuClose();
                            if (searchText) setSearchText("");
                        }}>
                            {item?.code} ({item?.name})
                        </MenuItem>
                    ))}
                </Popover>
            </Grid2>

            {/* Phone Number Field */}
            <Grid2 size={{ xs: 9, md: 10 }}>
                <TextField
                    variant="outlined"
                    placeholder={phoneNumberLength ? `Add ${phoneNumberLength} digit phone number` : "Please select country code"}
                    name="mobile"
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: parseInt(phoneNumberLength),
                        onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, ""),
                    }}
                    onChange={handleChange}
                    value={value}
                    fullWidth
                />
            </Grid2>
        </Grid2 >
    );
};

export { CustomPhoneInput };
