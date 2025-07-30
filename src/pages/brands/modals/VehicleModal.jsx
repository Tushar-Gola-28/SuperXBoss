import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { MenuItem, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { SegmentModal } from '../../segment/modal/SegmentModal';
import { useModalControl } from '../../../hooks/useModalControl';
import { useParams } from 'react-router';
import { createVehicle, updateVehicle } from '../../../services/vehicle';

export function VehicleModal({ open, close, refetch, editData, handleEditData }) {
    const { brand_id } = useParams()
    const [images, setImages] = useState()
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            start_year: "",
            end_year: ""

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            start_year: Yup.number()
                .required('Start Year is required'),

            end_year: Yup.number()
                .required('End Year is required')
                .min(
                    Yup.ref('start_year'),
                    'End Year must be greater than or equal to Start Year'
                ),
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            // formData.append("brand_day_offer", values.brand_day_offer)
            if (images[0]?.file) {
                formData.append("picture", images[0]?.file)
            }
            formData.append("description", values.description)
            formData.append("status", values.status)
            formData.append("start_year", values.start_year)
            formData.append("end_year", values.end_year)
            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Vehicle Update Successfully.", "success")
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
                        notify("Vehicle Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });
    console.log(formik.errors);

    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createVehicle(data, brand_id)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateVehicle(data, editData?._id, brand_id)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({
                name: editData?.name,
                description: editData?.description,
                start_year: editData?.start_year,
                end_year: editData?.end_year,
                status: String(editData?.status),

            })
            setImages([editData?.logo])
        }
    }, [editData,])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Vehicles Modal" : 'Create Vehicles Modal',
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
                        required
                        input={
                            <TextField
                                fullWidth
                                name="name"
                                required
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
                        label="Start Year"
                        required
                        input={
                            <TextField
                                fullWidth
                                required
                                name="start_year"
                                placeholder="Enter Description"
                                value={formik.values.start_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.start_year && Boolean(formik.errors.start_year)}
                                helperText={formik.touched.start_year && formik.errors.start_year}
                                select
                            >
                                {
                                    years?.map((it) => {
                                        return (
                                            <MenuItem key={it} value={it}>
                                                {it}
                                            </MenuItem>
                                        )
                                    })
                                }

                            </TextField>
                        }
                    />
                    <CustomInput
                        label="End Year"
                        required
                        input={
                            <TextField
                                required
                                fullWidth
                                name="end_year"
                                placeholder="Enter Description"
                                value={formik.values.end_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.end_year && Boolean(formik.errors.end_year)}
                                helperText={formik.touched.end_year && formik.errors.end_year}
                                select
                            >
                                {
                                    years
                                        ?.filter((it) => {
                                            const selectedStart = Number(formik.values.start_year);
                                            return !selectedStart || it >= selectedStart;
                                        })
                                        ?.map((it) => {
                                            return (
                                                <MenuItem key={it} value={it}>
                                                    {it}
                                                </MenuItem>
                                            )
                                        })
                                }

                            </TextField>
                        }
                    />
                    <CustomRadio
                        name="status"
                        required
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
