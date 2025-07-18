import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'
import { DatePicker } from '@mui/x-date-pickers'
import ImageUpload from '../../components/ui/ImageUpload'

export function BannerHandler() {
    return (
        <div>
            <PageStructure title="Create Banner">
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Product Assign"
                                input={
                                    <FormControl fullWidth>
                                        <Select
                                            name="type"
                                            displayEmpty
                                        >
                                            <MenuItem value={""}>
                                                <em> <ListItemText primary={"Product Assign"} /></em>
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
                            <ImageUpload

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
