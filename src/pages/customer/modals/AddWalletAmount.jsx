import React, { useState } from 'react'
import { CustomInput, CustomModal, CustomPaper, notify } from '../../../components'
import { Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { updateCustomerAmount } from '../../../services/customers';

export default function AddWalletAmount({ open, close, editData, refetch }) {
    const [amount, setAmount] = useState(0)
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateCustomerAmount(data)
        },
    })

    const handleSubmit = () => {
        updateMutation.mutate({ amount: parseFloat(amount), customer: editData?._id, all: editData?.all ? true : false }, {
            onSuccess: (data) => {
                if (data) {
                    console.log(data, "data");

                    notify(data.data.message || "Wallet Amount added Successfully.", "success")
                    refetch()
                    close()
                }

            }
        })
    }
    return (
        <div>
            <CustomModal open={open} close={close} heading="Add Wallet Amount"
                action={
                    <LoadingButton variant="contained" onClick={handleSubmit}
                        loading={updateMutation.isPending}
                        disabled={updateMutation.isPending}
                    >
                        Confirm
                    </LoadingButton>
                }
            >
                {editData?.mobile && <CustomPaper>
                    <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">
                                Customer Name
                            </Typography>
                            <Typography variant="body1">
                                {editData?.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">
                                Customer Mobile
                            </Typography>
                            <Typography variant="body1"   >
                                {editData?.mobile}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">
                                Current Balance
                            </Typography>
                            <Typography variant="body1"   >
                                Rs. {editData?.wallet_amount}
                            </Typography>
                        </Stack>
                    </Stack>


                </CustomPaper>}

                <Stack mt={2}>
                    <CustomInput
                        label={"Enter Amount"}
                        input={
                            <TextField
                                fullWidth
                                name='amount'
                                placeholder='Enter Wallet Amount'
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                type='number'
                                onWheel={(e) => e.target.blur()}

                            />
                        }
                    />
                </Stack>

            </CustomModal>

        </div>
    )
}
