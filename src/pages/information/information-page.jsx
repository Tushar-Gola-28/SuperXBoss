import { Backdrop, Box, CircularProgress, FormControlLabel, Grid2, Stack, Switch, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import { CustomInput, CustomPaper, notify } from '../../components';
import { LoadingButton } from '@mui/lab';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CategoryIcon from '@mui/icons-material/Category';
import { useMutation, useQuery } from '@tanstack/react-query';
import PersonIcon from '@mui/icons-material/Person';
import { fetchRatingInfo, updateRatingInfo } from '../../services/informations';
import { useEditData } from '../../hooks/useEdit';
import { useEffect, useState } from 'react';
export function InformationPage() {
    const { editData, handleEditData, setEditData } = useEditData()
    const { data: information, refetch, isLoading } = useQuery({
        queryKey: ['rating-info',],
        queryFn: ({ signal }) => fetchRatingInfo(signal)
    })

    useEffect(() => {
        if (information) {
            console.log(information, "information");

            handleEditData(information?._payload?.[0])
        }

    }, [information])
    const [disable, setDisable] = useState(true)

    const handleChange = (e) => {
        const { value, name } = e.target
        setEditData((prev) => {
            return {
                ...prev,
                [name]: value

            }
        })
    }
    const handleSubmit = () => {
        updateMutation.mutate({ userCount: editData?.userCount, categoryCount: editData?.categoryCount, yearCount: editData?.yearCount, rating: editData?.rating }, {
            onSuccess: ({ data: data }) => {
                if (data) {
                    notify("Updated Successfully.", "success")
                    handleEditData(null)
                    refetch()
                    setDisable(true)
                }

            }
        })
    }
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateRatingInfo(data, editData?._id)
        },
    })

    if (isLoading || updateMutation.isPending) {
        return <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return (
        <Box>
            <SectionHeader heading="Information's" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <CustomPaper p="20px" border={false}>

                <Grid2 container spacing={1}>

                    <Grid2 size={{ lg: editData ? 4 : 0, xs: 12 }} >
                        <CustomPaper p="15px" >
                            <Stack direction="row" justifyContent="flex-end">
                                <FormControlLabel sx={{ gap: 1 }} control={<Switch checked={disable} onChange={(e) => setDisable(e.target.checked)} />} label={disable ? "Disable" : "Active"} />
                            </Stack>
                            <Stack spacing={1.5}>
                                <CustomInput
                                    label="Rating"
                                    required
                                    input={
                                        <TextField fullWidth placeholder='Enter Question'
                                            required
                                            onChange={handleChange}
                                            type='number'
                                            value={editData?.rating}
                                            name='rating'
                                            disabled={disable}
                                        />
                                    }
                                />
                                <CustomInput
                                    label="Total User"
                                    required
                                    input={
                                        <TextField fullWidth placeholder='Enter Question'
                                            required
                                            onChange={handleChange}
                                            type='number'
                                            value={editData?.userCount}
                                            name='userCount'
                                            disabled={disable}
                                        />
                                    }
                                />
                                <CustomInput
                                    label="Total Category"
                                    required
                                    input={
                                        <TextField fullWidth placeholder='Enter Answer'
                                            required
                                            type='number'
                                            onChange={handleChange}
                                            value={editData?.categoryCount}
                                            name='categoryCount'
                                            disabled={disable}
                                        />
                                    }
                                />
                                <CustomInput
                                    label="Years"
                                    required
                                    input={
                                        <TextField fullWidth placeholder='Enter Answer'
                                            type='number'
                                            required
                                            onChange={handleChange}
                                            value={editData?.yearCount}
                                            name='yearCount'
                                            disabled={disable}

                                        />
                                    }
                                />
                                <Stack direction="row" justifyContent="end">
                                    <LoadingButton variant="contained" onClick={handleSubmit}

                                        loading={updateMutation?.isPending}
                                        disabled={updateMutation?.isPending || disable}
                                    >
                                        Update
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </CustomPaper>
                    </Grid2>
                </Grid2>
            </CustomPaper>

        </Box>
    )
}
