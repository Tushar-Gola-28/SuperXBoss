import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
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
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",

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
            // formData.append("brand_day_offer", values.brand_day_offer)
            if (images[0]?.file) {
                formData.append("picture", images[0]?.file)
            }
            formData.append("description", values.description)
            formData.append("status", values.status)
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
                    heading: editData ? "Update Vehicle" : 'Create Vehicle',
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
