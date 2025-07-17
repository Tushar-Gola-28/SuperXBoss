import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import { debounce } from 'lodash'
import { usePagination } from '../../hooks/usePagination'
import { useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add';
import { CustomPagination, CustomTable } from '../../components'
import { useQuery } from '@tanstack/react-query'
import { fetchMetaBlogsData } from '../../services/blogs'
import useColums from './hooks'


export default function BlogsPage() {
    const navigate = useNavigate()
    const { blogsMeta } = useColums()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")
    const { data, isLoading } = useQuery({
        queryKey: ['blogs-event', page, page_size, search],
        queryFn: ({ signal }) => fetchMetaBlogsData(signal, page, page_size, search)
    })
    useEffect(() => {
        if (data) {
            setTotal_records(data?.total_records)
            setTotalPages(data?.totalPages)

        }
    }, [data])
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 400)
    return (
        <Box>
            <SectionHeader heading="Blogs Meta" icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg" />
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('meta')}>Create Blogs Meta</Button>
                </Stack>
            </Stack>
            <CustomTable rows={data?.payload || []} columns={blogsMeta} loading={isLoading} />
            {data?.payload?.length > 0 &&
                <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />
            }
        </Box>
    )
}
