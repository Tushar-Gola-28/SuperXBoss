import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import BackArrow from "../assets/backArrow.svg";
import { useNavigate } from 'react-router';
export default function PageStructure({ title, children, naviage, noIcon, headerStyle, content }) {
    const navigate = useNavigate()
    return (
        <Paper sx={{ padding: { xs: "10px", sm: "20px 20px" } }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack spacing={2} direction="row" marginBottom="15px" >

                    {!noIcon && <Box
                        component="img"
                        alt="icon"
                        height="25px"
                        width="25px"
                        src={BackArrow}
                        onClick={() => navigate(naviage ? naviage : -1)}
                        style={{ cursor: 'pointer' }}
                    />}
                    <Stack spacing={1} width="100%">
                        <Stack direction="row" sx={headerStyle} marginBottom="10px">
                            <Typography color="primary" sx={{ color: "primary.main" }} variant="h4">
                                {title}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                {
                    content
                }
            </Stack>
            <Box sx={{ paddingLeft: { md: "40px" } }}>
                {children}
            </Box>
        </Paper>
    )
}
