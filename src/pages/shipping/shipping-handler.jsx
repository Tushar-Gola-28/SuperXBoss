import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'

export function ShippingHandler() {
    return (
        <div>
            <PageStructure title="Create Shipping">
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="State"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter State'
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Charges"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Charges'
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
