import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, } from '@tanstack/react-query';
import { useEffect } from 'react';
import { handleKeyPress } from '../../../functions';
import { createUnit, updateUnit } from '../../../services/unit';

export function UnitModal({ open, close, refetch, editData, handleEditData }) {

    const formik = useFormik({
        initialValues: {
            name: '',
            set: '',
            pc: '',
            status: "true",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            pc: Yup.string().optional(), // optional field
            set: Yup.number().optional(), // optional field

        }),
        onSubmit: (values) => {
            if (!values.pc) {
                delete values.pc
            }
            if (!values.set) {
                delete values.set
            }
            if (editData) {
                updateMutation.mutate(values, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Unit Update Successfully.", "success")
                            close()
                        }

                    }
                })
                return
            }
            createMutation.mutate(values, {
                onSuccess: (data) => {

                    if (data) {
                        refetch()
                        if (handleEditData) {
                            handleEditData(null)
                        }
                        notify("Unit Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });



    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createUnit(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateUnit(data, editData?._id)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({
                name: editData?.name,
                set: editData?.set || "",
                pc: editData?.pc || "",
                status: String(editData?.status),
            })
        }
    }, [editData])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Unit" : 'Create Unit',
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
                        label="Set"
                        input={
                            <TextField
                                fullWidth
                                name="set"
                                placeholder="Enter Name"
                                value={formik.values.set}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onKeyDown={handleKeyPress}
                                error={formik.touched.set && Boolean(formik.errors.set)}
                                helperText={formik.touched.set && formik.errors.set}
                            />
                        }
                    />
                    <CustomInput
                        label="PC"
                        input={
                            <TextField
                                fullWidth
                                name="pc"
                                placeholder="Enter Name"
                                value={formik.values.pc}
                                onChange={formik.handleChange}
                                onKeyDown={handleKeyPress}
                                onBlur={formik.handleBlur}
                                error={formik.touched.pc && Boolean(formik.errors.pc)}
                                helperText={formik.touched.pc && formik.errors.pc}
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
