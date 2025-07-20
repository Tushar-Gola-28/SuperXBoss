import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createCategory, editCategory } from '../../../services';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';

export function CreateCategory({ open, close, refetch, editData }) {
    const [images, setImages] = useState()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            featured: "true"
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
            if (images[0]?.file) {
                formData.append("picture", images[0]?.file)
            }
            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("status", values.status)
            formData.append("featured", values.featured)
            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            notify("Category Updated Successfully.", "success")
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
                        notify("Category Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createCategory(data)
        },
    })

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editCategory(data, editData?._id)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({ name: editData?.name, description: editData?.description, status: String(editData?.status), featured: String(editData?.featured) })
            if (editData?.picture) {
                setImages([editData?.picture])
            }
        }
    }, [editData])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Category" : 'Create Category',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isSuccess || updateMutation?.isPending}
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
                                required
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
                        required
                        input={
                            <TextField
                                fullWidth
                                required
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
                        required
                        value={formik.values.status}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Active" },
                                { value: "false", label: "In Active" },
                            ]
                        }
                    />
                    <CustomRadio
                        name="featured"
                        required
                        title="Featured"
                        value={formik.values.featured}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Yes" },
                                { value: "false", label: "No" },
                            ]
                        }
                    />
                </Stack>
            </CustomModal>
        </div>
    );
}
