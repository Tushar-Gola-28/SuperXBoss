/* eslint-disable react/prop-types */
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Pagination } from './Pagination'

export function CustomPagination({ page, page_size, total_records, setPage, totalPages, handlePageSize }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={1}
            marginTop="20px"
        >
            <Box
                minWidth={220}
                width={{ xs: "100%", sm: "max-content" }}
                alignSelf={{ xs: "center", sm: "auto" }}
            >
                <Typography
                    sx={{ textAlign: { xs: "center", sm: "normal" } ,color:"primary.main"}}
                    variant="body1"
                >{`Showing ${page !== 0 ? page * page_size : 1}  to ${(page + 1) * page_size > total_records
                    ? total_records
                    : (page + 1) * page_size
                    } of ${total_records} entries`}</Typography>
            </Box>
            <Box sx={{ order: { xs: 2, sm: 0 } }} flex={{ xs: 0, sm: 1 }}>
                <FormControl
                    sx={{ maxWidth: "max-content", flexGrow: 1 }}
                    fullWidth
                >
                    <Select
                        className="custom-select"
                        sx={{
                            "&.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.custom-select":
                            {
                                height: "37px",
                            },
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={page_size}
                        onChange={handlePageSize}
                        color="primary"
                        renderValue={() => `${page_size} per page`}
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={75}>75</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </Stack>
    )
}
