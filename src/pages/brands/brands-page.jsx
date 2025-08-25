import { Box, Button, InputAdornment, MenuItem, Select, Stack, Tab, Tabs, TextField } from '@mui/material'
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
import { usePagination } from '../../hooks/usePagination';
import { useEditData } from '../../hooks/useEdit';
import { BrandModal } from './modals/BrandModal';
import { fetchBrands } from '../../services/brands';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';
import { BrandSpareModal } from './modals/BrandSpareModal';
export function BrandsPage() {
    const { editData, handleEditData } = useEditData()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpen, handleCloseModal: handleCloseModal1, handleOpenModal: handleOpenModal1 } = useModalControl()
    const [search, setSearch] = useState("")
    const [value, setValue] = useState(() => tab || "Vehicle");

    const handleChange = (event, newValue) => {
        setValue(newValue);

        navigate({
            pathname: "/brands",
            search: `?${createSearchParams({ tab: newValue })}`,
        });
    };
    useEffect(() => {
        if (tab) {
            setValue(tab)
        }
    }, [tab])

    const { columns } = useColumns(handleEditData, handleOpenModal, handleOpenModal1)
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 600)


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['brands', page, page_size, search, value],
        queryFn: ({ signal }) => fetchBrands(signal, page, page_size, search, value)
    })
    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])

    return (
        <Box>
            <SectionHeader heading="Brands" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
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
                <Stack direction="row" gap="10px" alignItems="center">
                    <Stack>
                        {
                            value == "Vehicle" ?
                                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} >Create Vehicle Brand </Button>
                                :
                                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal1} >Create Spare Brand</Button>
                        }
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={{ mb: 2, display: "inline", display: "flex" }}>
                <Tabs value={value} onChange={handleChange} sx={{ bgcolor: "white", borderBottom: 1, borderColor: 'divider', }}>
                    <Tab label="Vehicle" value="Vehicle" />
                    <Tab label="Spare Parts" value="Spare Parts" />
                </Tabs>
            </Box>
            <CustomTable
                rows={data?._payload}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
            {open && <BrandModal open={open} close={() => { handleCloseModal(); handleEditData(null) }} refetch={refetch} editData={editData} handleEditData={handleEditData} />}
            {isOpen && <BrandSpareModal open={isOpen} close={() => { handleCloseModal1(); handleEditData(null) }} refetch={refetch} editData={editData} handleEditData={handleEditData} />}
        </Box>
    )
}
