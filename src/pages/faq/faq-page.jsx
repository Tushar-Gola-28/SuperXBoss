import { Box, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import { CustomInput, CustomPaper } from '../../components';
import { LoadingButton } from '@mui/lab';

export function FaqPage() {

    return (
        <Box>
            <SectionHeader heading="Faqs" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <CustomPaper p="20px" border={false}>

                <Stack sx={{ maxWidth: "500px" }} >
                    <CustomPaper p="15px" >
                        <Stack spacing={1.5}>
                            <CustomInput
                                label="Question"
                                input={
                                    <TextField fullWidth placeholder='Enter Question' />
                                }
                            />
                            <CustomInput
                                label="Answer"
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
                </Stack>
            </CustomPaper>

        </Box>
    )
}
