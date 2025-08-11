import { Box, Grid2, Stack, TextField } from '@mui/material'
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
export function InformationPage() {
    const { editData, handleEditData, setEditData } = useEditData()
    const { data: information, refetch } = useQuery({
        queryKey: ['rating-info',],
        queryFn: ({ signal }) => fetchRatingInfo(signal)
    })
    console.log(information);


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
                }

            }
        })
    }
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateRatingInfo(data, editData?._id)
        },
    })
    return (
        <Box>
            <SectionHeader heading="Information's" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <CustomPaper p="20px" border={false}>

                <Grid2 container spacing={1}>
                    {editData && <Grid2 size={{ lg: editData ? 4 : 0, xs: 12 }} >
                        <CustomPaper p="15px" >
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

                                        />
                                    }
                                />
                                <Stack direction="row" justifyContent="end">
                                    <LoadingButton variant="contained" onClick={handleSubmit}>
                                        Update
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </CustomPaper>
                    </Grid2>}
                    <Grid2 size={{ lg: editData ? 8 : 12, xs: 12 }} >
                        <Stack mt={2}>
                            {information && information?._payload?.map((information, index) => {
                                return (
                                    <Box sx={{ display: 'flex', justifyContent: "center", gap: '1.5rem', background: '#1B4B66', width: "500px", maxWidth: '500px', margin: "0 auto 2rem auto", borderRadius: "20px", padding: "1rem 0", position: "relative" }} className="information-box" key={index}>
                                        <div className='information-circle'>
                                            <StarOutlineIcon sx={{ fontSize: "2rem" }} />
                                            {information.rating}
                                        </div>
                                        <div className='information-circle'>
                                            <PersonIcon sx={{ fontSize: "2rem" }} />
                                            {information.userCount}</div>
                                        <div className='information-circle'>
                                            <CategoryIcon sx={{ fontSize: "2rem" }} />
                                            {information.categoryCount}K</div>
                                        <div className='information-circle'>
                                            <CalendarMonthIcon sx={{ fontSize: "2rem" }} />
                                            {information.yearCount}year</div>
                                        <div className='information-edit'
                                            onClick={() => { handleEditData(information) }}
                                        >
                                            <ModeEditOutlineIcon sx={{ color: "white", fontSize: "1.2rem" }} /> <span>Edit</span>
                                        </div>

                                    </Box>
                                )
                            })}
                        </Stack>
                    </Grid2>
                </Grid2>
            </CustomPaper>

        </Box>
    )
}
