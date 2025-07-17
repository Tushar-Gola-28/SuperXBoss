import { Box, Grid2, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import { CustomInput, CustomPaper } from '../../components';
import { LoadingButton } from '@mui/lab';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CategoryIcon from '@mui/icons-material/Category';
import { useQuery } from '@tanstack/react-query';
import PersonIcon from '@mui/icons-material/Person';
import { fetchRatingInfo } from '../../services/informations';
export function InformationPage() {
    const { data: information, isLoading, refetch } = useQuery({
        queryKey: ['rating-info',],
        queryFn: ({ signal }) => fetchRatingInfo(signal)
    })
    return (
        <Box>
            <SectionHeader heading="Information's" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <CustomPaper p="20px" border={false}>

                <Grid2 container spacing={1}>
                    <Grid2 size={{ lg: 4, xs: 12 }} >
                        <CustomPaper p="15px" >
                            <Stack spacing={1.5}>
                                <CustomInput
                                    label="Rating"
                                    input={
                                        <TextField fullWidth placeholder='Enter Question' />
                                    }
                                />
                                <CustomInput
                                    label="User"
                                    input={
                                        <TextField fullWidth placeholder='Enter Question' />
                                    }
                                />
                                <CustomInput
                                    label="Category"
                                    input={
                                        <TextField fullWidth placeholder='Enter Answer' />
                                    }
                                />
                                <CustomInput
                                    label="Years"
                                    input={
                                        <TextField fullWidth placeholder='Enter Answer' />
                                    }
                                />
                                <Stack direction="row" justifyContent="end">
                                    <LoadingButton variant="contained">
                                        Create
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </CustomPaper>
                    </Grid2>
                    <Grid2 size={{ lg: 8, xs: 12 }} >
                        <Stack mt={2}>
                            {information && information.map((information, index) => {
                                return (
                                    <Box sx={{ display: 'flex', justifyContent: "center", gap: '1.5rem', background: '#1B4B66', width: "500px", maxWidth: '500px', margin: "0 auto 2rem auto", borderRadius: "20px", padding: "1rem 0", position: "relative" }} className="information-box" key={index}>
                                        <div className='information-circle'>
                                            <StarOutlineIcon sx={{ fontSize: "2rem" }} />
                                            {information.rating}
                                        </div>
                                        <div className='information-circle'>
                                            <PersonIcon sx={{ fontSize: "2rem" }} />
                                            {information.user}</div>
                                        <div className='information-circle'>
                                            <CategoryIcon sx={{ fontSize: "2rem" }} />
                                            {information.category}K</div>
                                        <div className='information-circle'>
                                            <CalendarMonthIcon sx={{ fontSize: "2rem" }} />
                                            {information.year}year</div>
                                        <div className='information-edit'
                                            onClick={() => { getRetrieve(information) }}
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
