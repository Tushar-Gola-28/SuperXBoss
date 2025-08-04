
import { Backdrop, Box, CircularProgress, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CustomPagination, CustomTable } from '../../components';
import useColumns from './hooks/useColumns';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '../../hooks/usePagination';
import { fetchOrders } from '../../services/order';
export function OrderPage() {
    const [search, setSearch] = useState("")
    const { columns } = useColumns()
    const [orderStatus, setOrderStatus] = useState("")
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 400)

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page, page_size, search, orderStatus],
        queryFn: ({ signal }) => fetchOrders(signal, page, page_size, search, { status: orderStatus })
    })

    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])
    const ORDER_STATUSES = [
        { label: 'Order Status', value: '', color: 'primary.main' },
        // { label: 'Pending', value: 'pending', color: 'orange' },
        { label: 'Confirmed', value: 'confirmed', color: 'blue' },
        { label: 'Cancelled', value: 'cancelled', color: 'red' },
        { label: 'Shipped', value: 'shipped', color: 'purple' },
        { label: 'Completed', value: 'completed', color: 'green' },
        { label: 'Refunded', value: 'refunded', color: 'gray' },
    ]

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
                <Stack >
                    <Select select sx={{ width: "200px" }} size='small'
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        displayEmpty
                    >
                        {
                            ORDER_STATUSES?.map(({ label, value, color }) => {
                                return (
                                    <MenuItem value={value} key={value}>
                                        <span style={{ color }}>{label}</span>
                                    </MenuItem>
                                )
                            })
                        }


                    </Select>
                </Stack>

            </Stack>
            <CustomTable
                rows={data?._payload || []}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
        </Box>
    )
}
