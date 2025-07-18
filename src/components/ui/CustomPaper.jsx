import { Paper } from '@mui/material'
import React from 'react'

export function CustomPaper({ children, p = "10px", border = true, sx }) {
    return (
        <Paper sx={{ padding: p, border: border ? 1 : 0, borderColor: "divider", ...sx }}>
            {children}
        </Paper>
    )
}
