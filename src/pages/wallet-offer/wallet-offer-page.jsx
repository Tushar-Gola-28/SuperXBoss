import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import { CustomPagination, CustomTable } from '../../components';
import { useEditData } from '../../hooks/useEdit';
import { useModalControl } from '../../hooks/useModalControl';
import useColumns from './hooks/useColumns';
import { useQuery } from '@tanstack/react-query';
import { WalletModal } from './modals/WalletModal';
import { useEffect, useState } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { debounce } from 'lodash';
import searchIcon from '../../assets/search.svg'
import AddIcon from '@mui/icons-material/Add';
import { fetchRecharge } from '../../services/wallet-offer';
export function WalletOfferPage() {
    const { editData, handleEditData } = useEditData()
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const [search, setSearch] = useState("")
    const { columns } = useColumns(handleEditData, handleOpenModal)
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 600)


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['recharges', page, page_size, search],
        queryFn: ({ signal }) => fetchRecharge(signal, page, page_size, search)
    })
    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])

    return (
        <Box>
            <SectionHeader heading="Recharge offer" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <Stack gap={1} sx={{ mb: 2 }} direction="row" justifyContent={{ xs: "flex-end       ", md: "space-between" }} alignItems="center" flexWrap="wrap">
                <TextField
                    fullWidth
                    id="Search"
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{
                        maxWidth: { xs: "100%", md: "236px", lg: "256px" },
                        background: "white",
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box component="img" src={searchIcon} alt="Search Icon" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} >Create Recharge</Button>
                </Stack>
            </Stack>
            <CustomTable
                rows={data?._payload}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
            {open && <WalletModal open={open} close={() => { handleCloseModal(); handleEditData(null) }} refetch={refetch} editData={editData} handleEditData={handleEditData} />}

        </Box>
    )
}
