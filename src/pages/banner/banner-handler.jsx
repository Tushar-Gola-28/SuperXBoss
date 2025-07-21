import React, { useState } from 'react'
import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput } from '../../components'
import ImageUpload from '../../components/ui/ImageUpload'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../services/product'

export function BannerHandler() {
    const [prevImages, setPrevImages] = useState()
    const [images, setImages] = useState();
    const { data, isLoading, } = useQuery({
        queryKey: ['fetchProducts'],
        queryFn: ({ signal }) => fetchProducts(signal, false, 0, 15, "", true)
    })
    console.log(data);

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
                                            {data?._payload?.map(({ _id, name }) => (
                                                <MenuItem key={_id} value={_id}>
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <ImageUpload
                                onImageChange={(images) => {
                                    setImages(images)
                                }}
                                initialImages={prevImages}
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
