import { CustomInput, CustomModal, CustomPaper, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createCategory, createSubCategory, editCategory, editSubCategory } from '../../../services';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../config-global';
import { useParams } from 'react-router';

export function CreateSubCategory({ open, close, refetch, editData }) {
    const [images, setImages] = useState()
    let { id } = useParams();
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true"
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values, { setSubmitting }) => {
            // if (!images) {
            //     return notify("Image is required.")
            // }
            let formData = new FormData()
            // formData.append("file", images[0]?.file)
            // formData.append("name", values.name)
            // formData.append("description", values.description)
            // formData.append("status", values.status)
            createMutation.mutate({ ...values, parent: +id }, {
                onSuccess: ({ data: data }) => {
                    console.log(data, "Sub Category 1");
                    if (data && data?.success) {
                        refetch()
                        close()
                    } else {
                        notify(data?.message)
                    }

                },
                onError: (err) => {
                    console.log(err);
                    notify(err?.message)

                }
            })

        }
    });
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createSubCategory(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editSubCategory(data)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({ name: editData?.name, description: editData?.description, status: String(editData?.status) })
            setImages([`${BASE_URL}/upload/categories/${editData?.icon}`])
        }
    }, [editData])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: 'Create Category',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isSuccess}
                            disabled={createMutation.isSuccess}
                            onClick={formik.handleSubmit}
                        >
                            Create
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
            </CustomModal>
        </div>
    );
}
