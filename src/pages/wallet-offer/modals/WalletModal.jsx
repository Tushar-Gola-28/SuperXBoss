import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createRecharge, updateRecharge } from '../../../services/wallet-offer';

export function WalletModal({ open, close, refetch, editData, handleEditData }) {
    const formik = useFormik({
        initialValues: {
            amount: '',
            offer_amount: '',
            status: "true",
        },
        validationSchema: Yup.object({
            amount: Yup.number()
                .typeError('Amount must be a number')
                .required('Amount is required')
                .min(0, 'Amount must be greater than or equal to 0'),

            offer_amount: Yup.number()
                .typeError('Offer amount must be a number')
                .required('Offer amount is required')
                .min(0, 'Offer amount must be greater than or equal to 0'),

        }),
        onSubmit: (values) => {

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
            return await createRecharge(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateRecharge(data, editData?._id)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({
                name: editData?.name,
                amount: editData?.amount,
                offer_amount: editData?.offer_amount,
                status: String(editData?.status),
            })
        }
    }, [editData])
    console.log(editData);


    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Recharge" : 'Create Recharge',
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
                        label="Amount"
                        input={
                            <TextField fullWidth placeholder='Enter Amount'
                                name="amount"
                                value={formik.values.amount}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                        }
                    />
                    <CustomInput
                        label="Offer Amount"
                        input={
                            <TextField fullWidth placeholder='Enter Offer Amount'
                                name="offer_amount"
                                value={formik.values.offer_amount}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
