import React, { useState } from 'react'
import PageStructure from '../../components/ui/PageStructure'
import { Button, Checkbox, FormControl, Grid2, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import ImageUpload from '../../components/ui/ImageUpload'
import { CustomInput, CustomPaper, VideoUpload } from '../../components'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query'
import { fetchVehicleSegmentType } from '../../services/for-all'
export function ProductHandlePage() {
    const [images, setImages] = useState()
    const [videos, setVideos] = useState()
    const [discounts, setDiscounts] = useState([
        { items: "", discount: "" }
    ])
    const handleAddDiscount = () => {
        setDiscounts((prev) => [...prev, { items: "", discount: "" }])
    }
    const types = [
        {
            value: "vehicle",
            label: "Vehicle"

        }, {
            value: "Spare Parts",
            label: "Spare Parts"
        },
        {
            value: "vehicle_SpareParts",
            label: "Vehicle + Spare Parts"
        }
    ];
    const { data, isLoading } = useQuery({
        queryKey: ['vehicleSegmentType',],
        queryFn: ({ signal }) => fetchVehicleSegmentType(signal)
    })
    return (
        <PageStructure title="Create Product" >
            <Stack maxWidth={800}>
                <Grid2 container spacing={1}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomPaper>
                            <ImageUpload
                                onImageChange={(images) => {
                                    setImages(images)
                                }}
                                // initialImages={[]}
                                maxImages={5}
                            />
                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <CustomPaper sx={{ height: "100%" }} >

                            <VideoUpload
                                onImageChange={(images) => {
                                    setVideos(images)
                                }}
                                // initialImages={[]}
                                maxImages={5}
                            />
                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <CustomPaper>
                            <Stack mb={1}>
                                <Typography variant="h4" sx={{ color: "primary.main" }}>
                                    Basic Info*
                                </Typography>
                            </Stack>
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
                                        label="Part number"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Part number'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Price"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Price'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="B2B Price"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter B2B Price'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Any Discount? (Optional)"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Any Discount'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Brand Day Offer"
                                        input={
                                            <FormControl fullWidth>
                                                <Select
                                                    name="type"
                                                    displayEmpty
                                                >
                                                    <MenuItem value={""}>
                                                        <em> <ListItemText primary={"Brand Day Offer"} /></em>
                                                    </MenuItem>
                                                    {types.map(({ label }) => (
                                                        <MenuItem key={label} value={label}>
                                                            <ListItemText primary={label} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <CustomInput
                                        label="Vehicle Segment"
                                        input={
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-checkbox-label">Vehicle Segment</InputLabel>
                                                <Select
                                                    multiple
                                                    id="demo-multiple-checkbox-label"
                                                    value={[]}
                                                    // onChange={handleChange}

                                                    input={<OutlinedInput label="Vehicle Segment" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {data?.map(({ id, name }) => (
                                                        <MenuItem key={name} value={name}>
                                                            <Checkbox />
                                                            <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <CustomPaper>
                                        <Stack mb={1}>
                                            <Typography variant="h5" sx={{ color: "primary.main" }}>
                                                Bulk Discount*
                                            </Typography>
                                        </Stack>
                                        {
                                            discounts?.map((it, index) => {
                                                return (
                                                    <CustomPaper key={index} sx={{ mb: 1 }}>
                                                        <Grid2 container spacing={1} >
                                                            <Grid2 size={{ xs: 12, md: 6 }}>
                                                                <CustomInput
                                                                    label="Item Count"
                                                                    input={
                                                                        <TextField
                                                                            fullWidth
                                                                            placeholder='Enter Item Count'
                                                                        />
                                                                    }
                                                                />

                                                            </Grid2>
                                                            <Grid2 size={{ xs: 11, md: 5 }}>
                                                                <CustomInput
                                                                    label="Discount Price"
                                                                    input={
                                                                        <TextField
                                                                            fullWidth
                                                                            placeholder='Enter Discount Price'
                                                                        />
                                                                    }
                                                                />

                                                            </Grid2>
                                                            <Grid2 size={{ xs: 1, md: 1 }}>
                                                                <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>
                                                                    <IconButton color='primary'>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Stack>
                                                            </Grid2>
                                                        </Grid2>
                                                    </CustomPaper>
                                                )
                                            })
                                        }

                                        <Stack direction="row" mt={2}>
                                            <Button variant="outlined" onClick={handleAddDiscount}>
                                                Add New
                                            </Button>
                                        </Stack>

                                    </CustomPaper>
                                </Grid2>

                            </Grid2>

                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <CustomPaper>
                            <Stack mb={1}>
                                <Typography variant="h5" sx={{ color: "primary.main" }}>
                                    Invertory & Order Details*
                                </Typography>
                            </Stack>
                            <Grid2 container spacing={1}>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Item Stock Count"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Item Stock Count'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="SKU ID"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter SKU ID'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 10, }}>
                                    <CustomInput
                                        label="Product Unit"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Product Unit'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 2, }}>
                                    <CustomInput
                                        label="Unit"
                                        input={
                                            <FormControl fullWidth>
                                                <Select
                                                    name="type"
                                                    displayEmpty
                                                >
                                                    <MenuItem value={""}>
                                                        <em> <ListItemText primary={"Unit"} /></em>
                                                    </MenuItem>
                                                    {types.map(({ label }) => (
                                                        <MenuItem key={label} value={label}>
                                                            <ListItemText primary={label} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Minimum Quantity"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Minimum Quantity'
                                            />
                                        }
                                    />
                                </Grid2>
                            </Grid2>
                        </CustomPaper>


                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <CustomPaper>
                            <Stack mb={1}>
                                <Typography variant="h5" sx={{ color: "primary.main" }}>
                                    Points*
                                </Typography>
                            </Stack>
                            <Grid2 container spacing={1}>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Item Stock Count"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Item Stock Count'
                                            />
                                        }
                                    />
                                </Grid2>
                            </Grid2>
                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <CustomPaper>
                            <Stack mb={1}>
                                <Typography variant="h5" sx={{ color: "primary.main" }}>
                                    Tax Information*
                                </Typography>
                            </Stack>
                            <Grid2 container spacing={1}>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Tax Rate(%)"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Tax Rate(%)'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="hsn Code"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter hsn Code'
                                            />
                                        }
                                    />
                                </Grid2>
                            </Grid2>
                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <CustomPaper>
                            <Stack mb={1}>
                                <Typography variant="h5" sx={{ color: "primary.main" }}>
                                    Shipping & Return*
                                </Typography>
                            </Stack>
                            <Grid2 container spacing={1}>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="Return period in days"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter Return period in days'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <CustomInput
                                        label="hsn Code"
                                        input={
                                            <TextField
                                                fullWidth
                                                placeholder='Enter hsn Code'
                                            />
                                        }
                                    />
                                </Grid2>
                                <Grid2 size={{ xs: 12, }}>
                                    <CustomInput
                                        label="Write Return Policy"
                                        input={
                                            <TextField
                                                multiline
                                                minRows={8}
                                                fullWidth
                                                helperText="*Leave this box empty if you want to use default return policy"
                                                placeholder='Write Return Policy'
                                            />
                                        }
                                    />
                                </Grid2>
                            </Grid2>
                        </CustomPaper>
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
