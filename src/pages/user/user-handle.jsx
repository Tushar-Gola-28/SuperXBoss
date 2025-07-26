import {
    Button,
    FormControl,
    Grid2,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    FormHelperText,
    IconButton,
    InputAdornment
} from '@mui/material'
import PageStructure from '../../components/PageStructure'
import { CustomInput, CustomRadio, notify } from '../../components'
import ImageUpload from '../../components/ui/ImageUpload'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { createUser, updateUser } from '../../services/users'
import { CustomPhoneInput } from '../../components/ui/CustomPhoneInput copy'
import { useMobileCode } from '../../hooks/useMobileCode'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab'
export function UserHandle() {
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    const { user } = useParams()
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const location = useLocation()
    const navigate = useNavigate()
    const { code, setCode, phoneNumberLength, anchorEl, searchText, setSearchText, handleSearchTextChange, filteredMenuItems, handleCountryCode, handleMenuClose, handleCode, validCountryDataList } = useMobileCode()
    const {
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setValues
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            mobile: '',
            whatsapp: '',
            address: '',
            status: 'true'
        },
        onSubmit: (values) => {
            if (!image) {
                return notify('Image is required.')
            }

            let formData = new FormData()
            if (image[0]?.file) {
                formData.append('profile', image[0]?.file)
            }
            formData.append('name', values.name)
            formData.append('email', values.email)
            if (location.state) {
                if (values.password) {
                    formData.append('password', values.password)
                }
            } else {
                formData.append('password', values.password)
            }
            formData.append('mobile', values.mobile)
            formData.append('whatsapp', values.whatsapp)
            formData.append('address', values.address)
            formData.append('status', values.status)
            formData.append('countryCode', code)
            if (user) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            notify("User Updated Successfully.", "success")
                            navigate(-1)
                        }

                    }
                })
                return
            }
            createMutation.mutate(formData, {
                onSuccess: ({ data: data }) => {
                    if (data) {
                        notify("User Created Successfully.", "success")
                        navigate(-1)
                    }

                }
            })
        }
    })
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createUser(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateUser(data, user)
        },
    })

    useEffect(() => {
        if (location.state) {
            const { name, email, mobile, address, whatsapp, status, profile } = location.state
            setValues({
                name,
                email,
                mobile,
                whatsapp,
                address,
                status: String(status)
            })
            setPreview([profile])
            setImage([profile])
        }
    }, [location.state])

    return (
        <PageStructure title={user ? "Update User" : "Create User"}>
            <form onSubmit={handleSubmit}>
                <Stack maxWidth={600}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={12}>
                            <ImageUpload
                                onImageChange={(images) => {
                                    setImage(images)
                                }}
                                initialImages={user ? preview : []}
                                maxImages={1}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomInput
                                label="Mobile"
                                required
                                input={
                                    <CustomPhoneInput
                                        {...{ code, setCode, phoneNumberLength, validCountryDataList, filteredMenuItems, anchorEl, handleCode, handleCountryCode, handleSearchTextChange, handleMenuClose, searchText, handleChange, value: values.mobile }}
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Name"
                                required
                                input={
                                    <TextField
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        required
                                        fullWidth
                                        placeholder="Enter Name"
                                    />
                                }
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Whatsapp No"
                                required
                                input={
                                    <TextField
                                        name="whatsapp"
                                        value={values.whatsapp}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.whatsapp && Boolean(errors.whatsapp)}
                                        helperText={touched.whatsapp && errors.whatsapp}
                                        required
                                        fullWidth
                                        placeholder="Enter Whatsapp No"
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Email"
                                required
                                input={
                                    <TextField
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        required
                                        fullWidth
                                        placeholder="Enter Email"
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomInput
                                label="Address"
                                required
                                input={
                                    <TextField
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                        required
                                        fullWidth
                                        placeholder="Enter Address"
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
                            <CustomInput
                                label="Password"
                                required={user ? false : true}
                                input={
                                    <TextField
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        required={user ? false : true}
                                        fullWidth
                                        placeholder="Enter Password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePassword} edge="center" color='primary'>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                }
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, }}>
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
                        <LoadingButton variant="contained" type="submit"
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isPending || updateMutation?.isPending}
                        >
                            {user ? "Update" : "Create"}
                        </LoadingButton>
                        <Button variant="outlined" type="button">
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </PageStructure>
    )
}
