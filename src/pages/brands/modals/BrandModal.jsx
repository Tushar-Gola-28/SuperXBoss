import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { fetchBrandType, fetchVehicleSegmentType } from '../../../services/for-all';
import { handleKeyPress } from '../../../functions';
import { createBrand, editBrand } from '../../../services/brands';
import { fetchSegmentsAll } from '../../../services/segments';

export function BrandModal({ open, close, refetch, editData, handleEditData }) {

    const [images, setImages] = useState()
    const [brand, setBrand] = useState([])
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            type: "",
            // brand_day_offer: "",
            brand_day: "false"

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            formData.append("type", values.type)
            // formData.append("brand_day_offer", values.brand_day_offer)
            formData.append("brand_day", values.brand_day)
            if (images[0]?.file) {
                formData.append("logo", images[0]?.file)
            }
            formData.append("description", values.description)
            formData.append("status", values.status)
            brand.forEach(element => {
                formData.append("brand_segment", element)
            });
            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Brand Update Successfully.", "success")
                            close()
                        }

                    }
                })
                return
            }
            createMutation.mutate(formData, {
                onSuccess: ({ data: data }) => {
                    if (data) {
                        refetch()
                        if (handleEditData) {
                            handleEditData(null)
                        }
                        notify("Brand Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });

    const { data } = useQuery({
        queryKey: ['fetchSegmentsAll',],
        queryFn: ({ signal }) => fetchSegmentsAll(signal)
    })
    const { data: brandTypes } = useQuery({
        queryKey: ['brandTypes',],
        queryFn: ({ signal }) => fetchBrandType(signal)
    })

    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createBrand(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editBrand(data, editData?._id)
        },
    })
    useEffect(() => {
        if (editData && data?._payload && brandTypes?._payload) {
            formik.setValues({
                name: editData?.name,
                description: editData?.description,
                status: String(editData?.status),
                brand_day: String(editData?.brand_day),
                brand_day_offer: editData?.brand_day_offer,
                type: editData?.type,
            })
            setImages([editData?.logo])
            setBrand(editData?.brand_segment?.map((it) => it._id))
        }
    }, [editData, data?._payload, brandTypes?._payload])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Brand" : 'Create Brand',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isSuccess}
                            disabled={createMutation.isSuccess}
                            onClick={formik.handleSubmit}
                        >
                            {editData ? "Update" : "Create"}
                        </LoadingButton>
                    )
                }}
            >
                <Stack spacing={1}>
                    <ImageUpload
                        onImageChange={(images) => {
                            setImages(images)
                        }}
                        initialImages={editData ? images : []}
                        maxImages={1}
                    />
                    <CustomInput
                        label="Name"
                        input={
                            <TextField
                                fullWidth
                                name="name"
                                placeholder="Enter Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        }
                    />

                    <CustomInput
                        label="Description"
                        input={
                            <TextField
                                fullWidth
                                multiline
                                minRows={5}
                                name="description"
                                placeholder="Enter Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        }
                    />
                    {/* <CustomInput
                        label="Brand Day Offer"
                        input={
                            <TextField
                                fullWidth
                                name="brand_day_offer"
                                placeholder="Enter brand day offer"
                                value={formik.values.brand_day_offer}
                                onKeyDown={handleKeyPress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.brand_day_offer && Boolean(formik.errors.brand_day_offer)}
                                helperText={formik.touched.brand_day_offer && formik.errors.brand_day_offer}
                            />
                        }
                    /> */}
                    <CustomInput
                        label="Type"
                        input={
                            <FormControl fullWidth>
                                <Select
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="type"
                                    displayEmpty
                                >
                                    <MenuItem value={""}>
                                        <em> <ListItemText primary={"Type"} /></em>
                                    </MenuItem>
                                    {brandTypes?._payload?.map(({ name, _id }) => (
                                        <MenuItem key={name} value={_id}>
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    />
                    <CustomInput
                        label="Vehicle Segment"
                        input={
                            <FormControl fullWidth>
                                <InputLabel >Vehicle Segment</InputLabel>
                                <Select
                                    multiple
                                    value={brand}
                                    onChange={(e) => {
                                        setBrand(e.target.value || []);
                                    }}
                                    input={<OutlinedInput label="Vehicle Segment" />}
                                    renderValue={(selected) =>
                                        data?._payload
                                            ?.filter(({ _id }) => selected.includes(_id))
                                            .map(({ name }) => name)
                                            .join(', ')
                                    }
                                >
                                    {data?._payload?.map(({ _id, name }) => (
                                        <MenuItem key={_id} value={_id}>
                                            <Checkbox checked={brand.includes(_id)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    />
                    <CustomRadio
                        name="brand_day"
                        title="Brand Day"
                        required
                        value={formik.values.brand_day}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Yes" },
                                { value: "false", label: "No" },
                            ]
                        }
                    />
                    <CustomRadio
                        name="status"
                        title="Status"
                        value={formik.values.status}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Active" },
                                { value: "false", label: "In Active" },
                            ]
                        }
                    />
                </Stack>
            </CustomModal>
        </div>
    )
}
