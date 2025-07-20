import { LoadingButton } from '@mui/lab';
import { Box, InputAdornment, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import TicketsQueLogo from '../../assets/companyLogo.svg'
import sigin_background from '../../assets/sigin_backgound.webp'
import signIn from '../../assets/signIn.svg'
import PhoneIcon from "@mui/icons-material/Phone";
import Grid2 from '@mui/material/Grid2';
import PasswordIcon from '@mui/icons-material/Password';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import axios from 'axios';
import { notify } from '../../components';
import { useAuthValidator } from '../../store';
import { BASE_URL } from '../../../config-global';
import * as Yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import { urls } from '../../routes';
export const loginAdmin = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string().min(2, "Password must be at least 2 characters long").max(25, "Password can be at most 25 characters long").required("Password is required")
});
const LoginPage = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const matches = useMediaQuery("(max-width:600px)");
    const [loading, setLoading] = useState(false)
    const { handleAuthenticate, handleUserDetails } = useAuthValidator((state) => state)
    const { handleBlur, handleSubmit, handleChange, touched, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginAdmin
        ,
        onSubmit: async (value, action) => {
            try {
                setLoading(true)
                const { data } = await axios.post(`${BASE_URL}/login`, { email: value?.email, password: value?.password })
                console.log(data, "data");
                const { access_token, ...rest } = data?._payload
                if (data) {
                    localStorage.setItem('accessToken', access_token)
                    handleAuthenticate(true)
                    handleUserDetails(rest)
                    navigate(urls.DASHBOARD)
                    notify(data?.message, "success")
                }
            } catch (err) {
                notify(err?.response?.data?.message)
            } finally {
                setLoading(false)

            }
        }
    });


    return (
        <div>

            <Grid2 container spacing={1}  >
                <Grid2 size={6} sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Stack
                        width="100%"
                        height="100%"
                        padding="3rem 2rem 1rem 2rem"
                        justifyContent="space-between"
                        sx={{
                            backgroundImage: `url(${sigin_background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                        <Stack
                            spacing={3}
                            textAlign="center"
                            alignItems="center"
                            sx={{
                                aspectRatio: "16/9",
                                padding: "60px 18px",
                                borderRadius: "20px",
                                height: "85vh",
                                background: "#ffffff29",
                                border: "1px solid #ffffff80"
                            }}
                        >
                            <Box
                                sx={{ aspectRatio: "16/9" }}
                                component={"img"}
                                src={signIn}
                                width="100%"
                            />
                            <Stack>
                                <Typography
                                    variant="h2"
                                    sx={{ fontSize: "2rem", fontFamily: "Poppins" }}
                                    color="white"
                                >
                                    Welcome To TicketsQue
                                </Typography>
                                <Typography
                                    color="rgba(255, 255, 255, 0.85)"
                                    variant="caption"
                                    sx={{
                                        maxWidth: "470px",
                                        fontStyle: "Poppins",
                                        fontWeight: "500",
                                    }}
                                >
                                    Log in with your registered number to unlock SEO benefits.
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            flexWrap="wrap"
                            gap="10px"
                            width="100%"
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Typography color="white" variant="body1">
                                © 2023 TicketsQue Solutions Pvt. Ltd.
                            </Typography>
                            <Typography color="white" href="https://business.ticketsque.com/terms-and-conditions" component="a">
                                Terms & Conditions
                            </Typography>
                            <Typography variant="body1" color="white" component="a" href="https://business.ticketsque.com/privacy-policy">
                                Privacy Policy
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={{ sm: 6, xs: 12 }}>
                    <>
                        {matches ? (
                            <Stack
                                minHeight="100vh"
                                height="100%"
                                width="100%"
                                // maxWidth="600px"
                                justifyContent="space-between"
                                sx={{ backgroundColor: "rgba(242, 248, 253, 1)" }}
                                mx="auto"
                                padding={{
                                    lg: "4rem 8rem 1rem 5rem",
                                    md: "4rem 5rem 1rem 3rem",
                                    sm: "2rem 2rem 1rem 2rem",
                                    xs: "1rem",
                                }}
                                spacing={4}
                            >
                                <Stack
                                    height="100%"
                                    width="100%"
                                    borderRadius="4.65px"
                                    padding="1rem"
                                    gap={2}
                                    sx={{ boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.4)" }}
                                    justifyContent="space-between"
                                >
                                    <Stack spacing={2}>
                                        <Stack
                                            width="100%"
                                            alignItems={matches ? "center" : "normal"}
                                            gap={3}
                                            justifyContent={matches ? "center" : "normal"}
                                        >
                                            <Box
                                                component="img"
                                                src={TicketsQueLogo}
                                                alt="Logo"
                                                width={"100%"}
                                                maxWidth={{ xs: "290px", sm: "200px" }}
                                            />
                                            {matches && (
                                                <Stack
                                                    width="100%"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                    mb={2}
                                                >
                                                    <Typography textAlign="center" variant="h3">
                                                        Welcome To TicketsQue
                                                    </Typography>
                                                    <Typography textAlign="center" variant="body2">
                                                        Log in with your registered number to unlock SEO benefits.
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Stack>

                                        <Stack spacing={1}>
                                            <Typography variant="h3">Sign in to continue</Typography>
                                            <Typography variant="body2">
                                                Please log in using your registered mobile number and password.
                                            </Typography>
                                        </Stack>
                                        <form onSubmit={handleSubmit}>
                                            <Stack spacing={2}>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle">Email</Typography>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        placeholder="Enter Username"
                                                        onChange={handleChange}
                                                        name='email'
                                                        onBlur={handleBlur}
                                                        value={values?.email}
                                                        error={errors?.email && touched?.email}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PersonIcon color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={
                                                            errors.email && touched.email ? errors.email : null
                                                        }
                                                    />
                                                </Stack>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle">Password</Typography>
                                                    <TextField
                                                        fullWidth
                                                        id="password-number"
                                                        variant="outlined"
                                                        type={show ? "text" : 'password'}
                                                        placeholder="Enter Password"
                                                        onChange={handleChange}
                                                        error={errors?.password && touched?.password}
                                                        onBlur={handleBlur}
                                                        name='password'
                                                        value={values?.password}
                                                        helperText={
                                                            errors.password && touched.password ? errors.password : null
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PasswordIcon color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="start" onClick={() => setShow((prev) => !prev)} sx={{ cursor: "pointer" }}>
                                                                    {show ? <RemoveRedEyeIcon color="primary" /> : <VisibilityOffIcon color="primary" />}
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Stack>
                                                <Stack sx={{ marginTop: "20px !important" }}>

                                                    <LoadingButton
                                                        loading={loading}
                                                        disabled={loading}
                                                        type="submit"
                                                        size="large"
                                                        variant="contained"

                                                    >
                                                        Submit
                                                    </LoadingButton>
                                                </Stack>
                                            </Stack>
                                        </form>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack
                                minHeight="100vh"
                                height="100%"
                                width="100%"
                                maxWidth="650px"
                                justifyContent="space-between"
                                mx="auto"
                                sx={{ boxShadow: matches ? 5 : 0 }}
                                padding={{
                                    lg: "4rem 8rem 1rem 5rem",
                                    md: "4rem 5rem 1rem 3rem",
                                    sm: "2rem 2rem 1rem 2rem",
                                    xs: "1.5rem 1.5rem 1rem 1.5rem",
                                }}
                                spacing={4}
                            >
                                <Stack
                                    height="100%"
                                    sx={{
                                        boxShadow: matches ? 3 : 0,
                                        padding: matches ? 3 : 0,
                                        borderRadius: matches ? "4.65px" : 0,
                                    }}
                                    spacing={4}
                                    justifyContent="space-between"
                                >
                                    <Stack width="100%" spacing={{ xs: 6, sm: 3 }}>
                                        <Stack
                                            width="100%"
                                            alignItems={matches ? "center" : "normal"}
                                            justifyContent={matches ? "center" : "normal"}
                                        >
                                            <Box
                                                component="img"
                                                src={TicketsQueLogo}
                                                alt="Logo"
                                                width={"100%"}
                                                maxWidth={{ xs: "290px", sm: "200px" }}
                                            />
                                        </Stack>

                                        {matches && (
                                            <Stack
                                                width="100%"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Typography textAlign="center" variant="h3">
                                                    Welcome To TicketsQue
                                                </Typography>
                                                <Typography textAlign="center" variant="body2">
                                                    Log in with your registered number to unlock the dashboard.
                                                </Typography>
                                            </Stack>
                                        )}
                                        <Stack spacing={1}>
                                            <Typography variant="h3">Sign in to continue</Typography>
                                            <Typography variant="body2">
                                                Please log in using your registered mobile number and password.
                                            </Typography>
                                        </Stack>
                                        <form onSubmit={handleSubmit}>
                                            <Stack spacing={1} >
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle">Email</Typography>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        placeholder="Enter Username"
                                                        onChange={handleChange}
                                                        name='email'
                                                        onBlur={handleBlur}
                                                        value={values?.email}
                                                        error={errors?.email && touched?.email}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PersonIcon color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={
                                                            errors.email && touched.email ? errors.email : null
                                                        }
                                                    />
                                                </Stack>
                                                <Stack spacing={1} marginBottom="20px">
                                                    <Typography variant="subtitle">Password</Typography>
                                                    <TextField
                                                        fullWidth
                                                        id="password-number"
                                                        variant="outlined"
                                                        type={show ? "text" : 'password'}
                                                        placeholder="Enter Password"
                                                        onChange={handleChange}
                                                        error={errors?.password && touched?.password}
                                                        onBlur={handleBlur}
                                                        name='password'
                                                        value={values?.password}
                                                        helperText={
                                                            errors.password && touched.password ? errors.password : null
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PasswordIcon color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="start" onClick={() => setShow((prev) => !prev)} sx={{ cursor: "pointer" }}>
                                                                    {show ? <RemoveRedEyeIcon color="primary" /> : <VisibilityOffIcon color="primary" />}
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Stack>
                                                <Stack sx={{ marginTop: "40px !important" }}>

                                                    <LoadingButton
                                                        loading={loading}
                                                        disabled={loading}
                                                        type="submit"
                                                        size="large"
                                                        variant="contained"

                                                    >
                                                        Submit
                                                    </LoadingButton>
                                                </Stack>
                                            </Stack>
                                        </form>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )}
                    </>
                </Grid2>
            </Grid2>

        </div>
    )
}

export { LoginPage }
