import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CustomPagination, CustomTable } from '../../components';
import useColumns from './hooks/useColumns';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '../../hooks/usePagination';
import { useNavigate } from 'react-router';
import { urls } from '../../routes';
import { fetchProducts } from '../../services/product';

export function ProductPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const { columns } = useColumns()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 400)


    const { data, isLoading, } = useQuery({
        queryKey: ['fetchProducts', page, page_size, search],
        queryFn: ({ signal }) => fetchProducts(signal, true, page, page_size, search)
    })
    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])
    return (
        <Box>
            <SectionHeader heading="Products" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(`${urls?.PRODUCTS_HANDLER}/`)} >Create Product</Button>
                </Stack>
            </Stack>
            <CustomTable
                rows={data?._payload}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
            {/* {open && <BrandModal open={open} close={handleCloseModal} refetch={refetch} editData={editData} />} */}
        </Box>
    )
}
