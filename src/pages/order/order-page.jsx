
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
// import { CreateCategory } from './modals/create-category';
import { useModalControl } from '../../hooks/useModalControl';
import { CustomPagination, CustomTable } from '../../components';
import useColumns from './hooks/useColumns';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../services';
import { usePagination } from '../../hooks/usePagination';
import useReload from '../../hooks/useReload';
import { useEditData } from '../../hooks/useEdit';
// import { BrandModal } from './modals/BrandModal';
export function OrderPage() {
    const { editData, handleEditData } = useEditData()
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const [search, setSearch] = useState("")
    const { columns } = useColumns(handleEditData, handleOpenModal)
    const { handleReload, reload } = useReload()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 400)


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['categories', page, page_size, search, reload],
        queryFn: ({ signal }) => fetchCategories(signal, page + 1, page_size, search)
    })
    useEffect(() => {
        if (data) {
            setTotal_records(data?.count)
            setTotalPages(data?.totalPages)
        }
    }, [data])
    return (
        <Box>
            <SectionHeader heading="Orders" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
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

            </Stack>
            <CustomTable
                rows={data?.rows}
                columns={columns}
                loading={isLoading}
            />
            {data?.rows?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
            {/* {open && <BrandModal open={open} close={handleCloseModal} refetch={refetch} editData={editData} />} */}
        </Box>
    )
}
