import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { createSegment, updateSegment } from '../../../services/segments';

export function SegmentModal({ open, close, refetch, editData, handleEditData }) {

    const [images, setImages] = useState()
    const formik = useFormik({
        initialValues: {
            name: '',
            status: "true",

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            formData.append("status", values.status)
            if (images[0]?.file) {
                formData.append("icon", images[0]?.file)
            }

            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Segment Update Successfully.", "success")
                            close()
                        }

                    }
                })
                return
            }
            createMutation.mutate(formData, {
                onSuccess: (data) => {
                    console.log(data, "data");

                    if (data) {
                        refetch()
                        if (handleEditData) {
                            handleEditData(null)
                        }
                        notify("Segment Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });



    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createSegment(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateSegment(data, editData?._id)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({
                name: editData?.name,
                status: String(editData?.status),
            })
            setImages([editData?.icon])
        }
    }, [editData])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Segment" : 'Create Segment',
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
