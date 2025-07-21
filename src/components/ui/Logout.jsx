import React from 'react'
import { CustomModal } from './CustomModal'
import { Button, Typography } from '@mui/material'
import { logout } from '../../services/for-all'

export default function LogoutModal({ open, close }) {
    const handleSubmit = async () => {
        const response = await logout()
        console.log(response);

        if (response) {
            localStorage.clear()
            window.location.replace('/')
        }
    }
    return (
        <div>
            <CustomModal size="xs" open={open} close={close} heading="Logout" action={<Button onClick={handleSubmit} variant="contained" color="error">Confirm</Button>}>
                <Typography variant="subtitle1">Are you sure you want to logout.</Typography>
            </CustomModal>
        </div>
    )
}
