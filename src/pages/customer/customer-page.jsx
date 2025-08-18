
import { Backdrop, Box, Button, CircularProgress, InputAdornment, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CustomPagination, CustomTable } from '../../components';
import useColumns from './hooks/useColumns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePagination } from '../../hooks/usePagination';
import { fetchCustomers, updateCustomerStatus } from '../../services/customers';
import AddWalletAmount from './modals/AddWalletAmount';
import { useModalControl } from '../../hooks/useModalControl';
import { useEditData } from '../../hooks/useEdit';

export function CustomerPage() {
    const [search, setSearch] = useState("")
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { handleEditData, editData } = useEditData()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateCustomerStatus(data)
        },
    })
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['customers', page + 1, page_size, search],
        queryFn: ({ signal }) => fetchCustomers(signal, page + 1, page_size, search)
    })
    const { columns } = useColumns(updateMutation, refetch, handleOpenModal, handleEditData)

    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 400)



    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])


    if (updateMutation.isPending) {
        return <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }


    return (
        <Box>
            <SectionHeader heading="Customers" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
            <Stack gap={1} sx={{ mb: 2 }} direction="row" justifyContent={{ xs: "flex-end", md: "space-between" }} alignItems="center" flexWrap="wrap">
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
                <Button variant="contained" onClick={() => {
                    handleEditData({ all: true });
                    handleOpenModal()
                }}>
                    Add Wallet Amount
                </Button>
            </Stack>
            <CustomTable
                rows={data?._payload}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}

            {open && <AddWalletAmount {...{ open, close: handleCloseModal, editData, refetch }} />}
        </Box>
    )
}
