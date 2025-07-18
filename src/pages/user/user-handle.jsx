import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'

export function UserHandle() {
    return (
        <PageStructure title="Create User">
            <Stack maxWidth={600}>
                <Grid2 container spacing={1}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Name"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Name'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Mobile"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Mobile'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Whatsapp No"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Whatsapp No'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Email"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Email'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Address"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Address'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomInput
                            label="Password"
                            input={
                                <TextField
                                    fullWidth
                                    placeholder='Enter Password'
                                />
                            }
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, }}>
                        <CustomInput
                            label="Role"
                            input={
                                <FormControl fullWidth>
                                    <Select
                                        name="type"
                                        displayEmpty
                                    >
                                        <MenuItem value={""}>
                                            <em> <ListItemText primary={"Role"} /></em>
                                        </MenuItem>
                                        {[].map(({ label }) => (
                                            <MenuItem key={label} value={label}>
                                                <ListItemText primary={label} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
    )
}
