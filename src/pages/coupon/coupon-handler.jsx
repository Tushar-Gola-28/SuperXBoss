import { Button, TextField, Stack, Grid2 } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import PageStructure from '../../components/PageStructure'
import { CustomInput, CustomRadio, notify } from '../../components'
import { LoadingButton } from '@mui/lab'
import { useMutation } from '@tanstack/react-query'
import { createCoupon, updateCoupon } from '../../services/coupon'
import { useNavigate, useParams } from 'react-router'

export function CouponHandler() {
    const { coupon } = useParams()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            start_date: null,
            end_date: null,
            code: '',
            amount: '',
            min_cart_amt: '',
            description: '',
            status: "true"
        },
        validationSchema: Yup.object({
            start_date: Yup.date().nullable().required('Start date is required'),
            end_date: Yup.date().nullable().required('End date is required'),
            code: Yup.string().required('Code is required'),
            amount: Yup.number().required('Amount is required'),
            min_cart_amt: Yup.number().required('Minimum amount is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: (values) => {
            if (coupon) {
                updateMutation.mutate(values, {
                    onSuccess: (data) => {
                        if (data) {
                            notify("Coupon Update Successfully.", "success")
                            navigate(-1)
                        }

                    }
                })
                return
            }

            createMutation.mutate(values, {
                onSuccess: (data) => {
                    if (data) {
                        notify("Coupon Created Successfully.", "success")
                        navigate(-1)
                    }

                }
            })
        },
    })

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = formik
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createCoupon(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateCoupon(data, coupon)
        },
    })
    return (
        <div>
            <PageStructure title="Create Coupon">
                <form onSubmit={handleSubmit}>
                    <Stack maxWidth={600}>
                        <Grid2 container spacing={1}>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="Start Date"
                                    input={
                                        <DatePicker
                                            sx={{ width: "100%" }}
                                            value={values.start_date}
                                            onChange={(val) => setFieldValue('start_date', val)}
                                            onBlur={handleBlur}
                                            disablePast
                                            slotProps={{
                                                textField: {
                                                    error: Boolean(touched.start_date && errors.start_date),
                                                    helperText: touched.start_date && errors.start_date
                                                }
                                            }}
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="End Date"
                                    input={
                                        <DatePicker
                                            sx={{ width: "100%" }}
                                            value={values.end_date}
                                            onChange={(val) => setFieldValue('end_date', val)}
                                            onBlur={handleBlur}
                                            disablePast
                                            slotProps={{
                                                textField: {
                                                    error: Boolean(touched.end_date && errors.end_date),
                                                    helperText: touched.end_date && errors.end_date
                                                }
                                            }}
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="Code"
                                    input={
                                        <TextField
                                            fullWidth
                                            name="code"
                                            value={values.code}
                                            onChange={(e) => {
                                                const upperCased = e.target.value.toUpperCase()
                                                setFieldValue('code', upperCased)
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.code && Boolean(errors.code)}
                                            helperText={touched.code && errors.code}
                                            placeholder='Enter Code'
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="Amount"
                                    input={
                                        <TextField
                                            fullWidth
                                            type='number'
                                            name="amount"
                                            value={values.amount}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.amount && Boolean(errors.amount)}
                                            helperText={touched.amount && errors.amount}
                                            placeholder='Enter Amount'
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <CustomInput
                                    label="Minimum Amount"
                                    input={
                                        <TextField
                                            fullWidth
                                            type='number'
                                            name="min_cart_amt"
                                            value={values.min_cart_amt}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.min_cart_amt && Boolean(errors.min_cart_amt)}
                                            helperText={touched.min_cart_amt && errors.min_cart_amt}
                                            placeholder='Enter Minimum Amount'
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <CustomInput
                                    label="Description"
                                    input={
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={8}
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.description && Boolean(errors.description)}
                                            helperText={touched.description && errors.description}
                                            placeholder='Enter Description'
                                        />
                                    }
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <CustomRadio
                                    name="status"
                                    title="Status"
                                    value={values.status}
                                    handleChange={handleChange}
                                    options={
                                        [
                                            { value: "true", label: "Active" },
                                            { value: "false", label: "In Active" },
                                        ]
                                    }
                                />
                            </Grid2>
                        </Grid2>

                        <Stack direction="row" gap="10px" mt={2}>
                            <LoadingButton variant="contained" type="submit">
                                Create
                            </LoadingButton>
                            <Button variant="outlined" type="button">
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </PageStructure>
        </div>
    )
}
