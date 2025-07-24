import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid2, IconButton, Stack, Typography } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import { useQuery } from '@tanstack/react-query';
import { fetchFaq } from '../../services/faq';
import { FaqModal } from './modals/FaqModal';
import { useModalControl } from '../../hooks/useModalControl';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomPagination, CustomPaper } from '../../components';
import { usePagination } from '../../hooks/usePagination';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useEditData } from '../../hooks/useEdit';
export function FaqPage() {
    const { handleEditData, editData } = useEditData()
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchFaq', page, page_size],
        queryFn: ({ signal }) => fetchFaq(signal, page, page_size)
    })
    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])

    return (
        <Box>
            <SectionHeader heading="Faqs" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <Stack gap={1} sx={{ mb: 2 }} direction="row" justifyContent={{ xs: "flex-end", }} alignItems="center" flexWrap="wrap">
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} >Create FAQ</Button>
            </Stack>
            <CustomPaper border={false} sx={{ minHeight: `${window.innerHeight - 330}px`, maxHeight: `${window.innerHeight - 330}px`, overflowY: "scroll" }}>
                <Grid2 container spacing={1} sx={{}}>
                    {
                        data?._payload?.map((it, index) => {
                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={it._id}>
                                    <CustomPaper sx={{ height: "100%" }}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}

                                                aria-controls={it._id}
                                                id={it._id}
                                                sx={{ borderBottom: 1, borderColor: "divider" }}
                                            >
                                                <Typography variant='h5' fontSize="15px">Q{index + 1}. {it?.question}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {it.answer}
                                                <Stack direction="row" justifyContent="end"
                                                    sx={{ borderTop: 1, borderColor: "divider", mt: 2, pt: 1 }}>
                                                    <IconButton color="primary" onClick={() => { handleEditData(it); handleOpenModal() }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <Stack direction="row" width={120} sx={{ p: 0 }}>
                                                        {it?.status ? (
                                                            <div className="active">Active</div>
                                                        ) : (
                                                            <div className="pending">In Active</div>
                                                        )}
                                                    </Stack>

                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    </CustomPaper>
                                </Grid2>
                            )
                        })
                    }
                </Grid2>
            </CustomPaper>
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
            {open && <FaqModal open={open} close={handleCloseModal} refetch={refetch} editData={editData} />}

        </Box>
    )
}
