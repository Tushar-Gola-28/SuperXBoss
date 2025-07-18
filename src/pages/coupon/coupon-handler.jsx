import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'
import { DatePicker } from '@mui/x-date-pickers'

export function CouponHandler() {
    return (
        <div>
            <PageStructure title="Create Coupon">
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Start Date"
                                input={
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        placeholder='Enter State'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="End Date"
                                input={
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        placeholder='Enter Charges'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Code"
                                input={
                                    <TextField

                                        fullWidth
                                        placeholder='Enter Code'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Amount"
                                input={
                                    <TextField

                                        fullWidth
                                        placeholder='Enter Amount'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Minimum Amount"
                                input={
                                    <TextField

                                        fullWidth
                                        placeholder='Enter Minimum Amount'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Description"
                                input={
                                    <TextField
                                        multiline
                                        minRows={8}

                                        fullWidth
                                        placeholder='Enter Description'
                                    />
                                }
                            />
                        </Grid2>
                    </Grid2>
                    <Stack direction="row" gap="10px" mt={2}>
                        <Button variant="contained">
                            Create
                        </Button>
                        <Button variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </PageStructure>
        </div>
    )
}
