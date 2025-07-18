import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'

export function RoleHandler() {
    return (
        <div>
            <PageStructure title="Create Role">
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, }}>
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
