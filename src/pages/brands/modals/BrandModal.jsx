import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { fetchBrandType } from '../../../services/for-all';
import { createBrand, editBrand } from '../../../services/brands';
import { fetchSegmentsAll } from '../../../services/segments';
import { SegmentModal } from '../../segment/modal/SegmentModal';
import { useModalControl } from '../../../hooks/useModalControl';

export function BrandModal({ open, close, refetch, editData, handleEditData }) {

    const [images, setImages] = useState()
    const [brand, setBrand] = useState([])
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            type: "",

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            if (!formik.values.type) {
                return notify("Brand Type is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            formData.append("type", values.type)
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

    const { data, refetch: segmentRefetch } = useQuery({
        queryKey: ['fetchSegmentsAll',],
        queryFn: ({ signal }) => fetchSegmentsAll(signal, editData ? "" : true)
    })
    const { data: brandTypes } = useQuery({
        queryKey: ['brandTypes',],
        queryFn: ({ signal }) => fetchBrandType(signal)
    })

    useEffect(() => {
        if (brandTypes?._payload?.length) {
            const valueData = brandTypes?._payload.find((it) => it.name == "Vehicle")
            if (valueData) {
                formik.setFieldValue("type", valueData._id)
            }
        }
    }, [brandTypes])

    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createBrand(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editBrand(data, editData?._id)
        },
    });


    useEffect(() => {
        if (editData && data?._payload && brandTypes?._payload) {
            formik.setValues({
                name: editData?.name,
                description: editData?.description,
                status: String(editData?.status),
            })
            setImages([{ preview: editData?.logo }])

            setBrand(editData?.brand_segment?.map((it) => it._id))
        }
    }, [editData, data?._payload, brandTypes?._payload,])



    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Vehicle Brand" : 'Create Vehicle Brand',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isPending || updateMutation?.isPending}
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
                        required
                        input={
                            <TextField
                                fullWidth
                                required
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

                    <CustomInput
                        label="Vehicle Segment"
                        input={
                            <Box>
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
                                <Stack direction="row" justifyContent="flex-end" mt={1}>
                                    <Button variant="outlined" onClick={handleOpenModal}>Add Segment</Button>
                                </Stack>
                            </Box>
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
                {isOpen && <SegmentModal open={isOpen} close={() => { handleCloseModal(); }} refetch={segmentRefetch} />}
            </CustomModal>
        </div>
    )
}
