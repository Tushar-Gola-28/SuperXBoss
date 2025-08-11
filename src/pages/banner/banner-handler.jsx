import React, { useEffect, useState } from 'react'
import { Button, FormControl, Grid2, ListItemText, MenuItem, Select, Stack } from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput, CustomRadio, notify } from '../../components'
import ImageUpload from '../../components/ui/ImageUpload'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../services/product'
import { createBanner, updateBanner } from '../../services/banners'
import { LoadingButton } from '@mui/lab'
import { useLocation, useNavigate, useParams } from 'react-router'

export function BannerHandler() {
    const { banner } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [prevImages, setPrevImages] = useState()
    const [status, setStatus] = useState("true")
    const [position, setPosition] = useState("top")
    const [images, setImages] = useState();
    const [product, setProduct] = useState("")
    const { data, isLoading, } = useQuery({
        queryKey: ['fetchProducts'],
        queryFn: ({ signal }) => fetchProducts(signal, false, 0, 15, "", true)
    })



    const handleSubmit = () => {
        if (!images?.length) {
            return notify("Banner image is required.")
        }
        if (!product) {
            return notify("Product is required.")
        }
        let formdata = new FormData()
        if (images[0]?.file) {
            formdata.append("image", images[0]?.file)
        }
        formdata.append("product_id", product)
        formdata.append("status", status)
        formdata.append("position", position)
        if (banner) {

            updateMutation.mutate(formdata, {
                onSuccess: ({ data: data }) => {
                    if (data) {
                        notify("Banner Updated Successfully.", "success")
                        navigate(-1)
                    }

                }
            })
            return
        }
        createMutation.mutate(formdata, {
            onSuccess: ({ data: data }) => {
                if (data) {
                    notify("Banner Created Successfully.", "success")
                    navigate(-1)
                }

            }
        })


    }
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createBanner(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateBanner(data, banner)
        },
    })


    useEffect(() => {
        if (location.state && data?._payload) {
            const { image, product, status, position: ptn } = location.state
            setStatus(String(status))
            setPosition(ptn || "top")
            setProduct(product._id)
            setImages([image])
            setPrevImages([image])
        }
    }, [location.state, data?._payload])
    if (isLoading) {
        return
    }
    return (
        <div>
            <PageStructure title={banner ? "Update Banner" : "Create Banner"}>
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Product Assign"
                                required
                                input={
                                    <FormControl fullWidth>
                                        <Select
                                            name="type"
                                            required
                                            displayEmpty
                                            value={product}
                                            onChange={(e) => {
                                                setProduct(e.target.value)
                                            }}
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
                        <Grid2 size={{ xs: 12, }}>
                            <CustomRadio
                                name="status"
                                title="Status"
                                value={status}
                                handleChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                options={
                                    [
                                        { value: "true", label: "Active" },
                                        { value: "false", label: "In Active" },
                                    ]
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomRadio
                                name="status"
                                title="Position"
                                value={position}
                                handleChange={(e) => {
                                    setPosition(e.target.value)
                                }}
                                options={
                                    [
                                        { value: "top", label: "Top Section" },
                                        { value: "mid", label: "Mid Section" },
                                        { value: "bottom", label: "Bottom Section" },
                                    ]
                                }
                            />
                        </Grid2>

                    </Grid2>
                    <Stack direction="row" gap="10px" mt={2}>
                        <LoadingButton onClick={handleSubmit} variant="contained"
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isPending || updateMutation?.isPending}
                        >
                            {banner ? "Update" : "Create"}
                        </LoadingButton>
                        <Button variant="outlined" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </PageStructure>
        </div>
    )
}
