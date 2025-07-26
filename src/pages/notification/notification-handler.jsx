import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'
import { DatePicker } from '@mui/x-date-pickers'
import ImageUpload from '../../components/ui/ImageUpload'
import { LoadingButton } from '@mui/lab'

export function NotificationHandler() {
    return (
        <div>
            <PageStructure title="Create Notification">
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, }}>
                            <ImageUpload

                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Customer"
                                input={
                                    <FormControl fullWidth>
                                        <Select
                                            name="type"
                                            displayEmpty
                                        >
                                            <MenuItem value={""}>
                                                <em> <ListItemText primary={"Customer"} /></em>
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
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Title"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Title'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Description"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Description'
                                        multiline
                                        minRows={8}
                                    />
                                }
                            />
                        </Grid2>
                    </Grid2>

                    <Stack direction="row" gap="10px" mt={2}>
                        <LoadingButton variant="contained"
                        // loading={createMutation.isPending || updateMutation?.isPending}
                        // disabled={createMutation.isPending || updateMutation?.isPending}
                        >
                            Create
                        </LoadingButton>
                        <Button variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </PageStructure>
        </div>
    )
}
