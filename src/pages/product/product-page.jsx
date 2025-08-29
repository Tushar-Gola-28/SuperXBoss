import { Autocomplete, Box, Button, FormControl, InputAdornment, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material'
import SectionHeader from '../../components/SectionHeader'
import searchIcon from '../../assets/search.svg'
import AddIcon from '@mui/icons-material/Add';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { CustomInput, CustomPagination, CustomTable } from '../../components';
import useColumns from './hooks/useColumns';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '../../hooks/usePagination';
import { useLocation, useNavigate } from 'react-router';
import { urls } from '../../routes';
import { fetchProducts } from '../../services/product';
import { fetchActiveBrands } from '../../services/brands';
import { fetchAllCategories, fetchCategories } from '../../services';

export function ProductPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [search, setSearch] = useState("")
    const { columns } = useColumns()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    // Use queryParams to extract the page value from the URL
    const queryParams = new URLSearchParams(location.search);
    const savedPage = queryParams.get('page');

    // Set initial page based on URL if available
    useEffect(() => {
        if (savedPage) {
            setPage(parseInt(savedPage, 10));
        }
    }, [savedPage, setPage]);
    const handleSearch = debounce((value) => {
        setSearch(value)
    }, 600)
    const [brand, setBrand] = useState("")
    const [categories, setCategories] = useState("")
    const { data: active_brand, refetch: fetchBrand, isLoading: isLoading2 } = useQuery({
        queryKey: ['fetchActiveBrands',],
        queryFn: ({ signal }) => fetchActiveBrands(signal)
    })

    const { data, isLoading, } = useQuery({
        queryKey: ['fetchProducts', page + 1, page_size, search, brand, categories],
        queryFn: ({ signal }) => fetchProducts(signal, "", page + 1, page_size, search, undefined, brand, categories),
        enabled: savedPage !== null,
    })
    useEffect(() => {
        if (data?.pagination) {
            setTotal_records(data?.pagination?.total)
            setTotalPages(data?.pagination?.totalPages)
        }
    }, [data])
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (savedPage === null) {
            queryParams.set('page', 0);
            navigate({
                pathname: location.pathname,
                search: queryParams.toString(),
            });
        } else {
            queryParams.set('page', page);
            navigate({
                pathname: location.pathname,
                search: queryParams.toString(),
            });
        }
    }, [page, location.search, navigate, savedPage]);
    const { data: category } = useQuery({
        queryKey: ['all-categories',],
        queryFn: ({ signal }) => fetchAllCategories(signal,)
    })
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
                <Stack direction="row" alignItems="center" gap="10px" flexWrap="wrap">
                    <CustomInput
                        input={
                            <Autocomplete
                                options={active_brand?._payload || []}
                                getOptionLabel={(option) =>
                                    option?.name ? `${option.name} (${option?.type?.name || ""})` : ""
                                }
                                value={active_brand?._payload?.find((b) => b._id === brand) || null}
                                onChange={(_, newValue) => setBrand(newValue?._id || "")}
                                sx={{ maxWidth: 400, width: { xs: 300, md: 200 } }}  // 👈 max width applied
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="-Select Brand-"
                                        fullWidth
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                height: 45,              // 👈 input height
                                                minHeight: 40,
                                            },
                                            "& input": {
                                                height: "100%",          // 👈 text stays centered
                                                padding: "20px 14px",
                                            },
                                        }}
                                    />
                                )}
                            />
                        }
                    />
                    <CustomInput
                        input={
                            <Autocomplete
                                options={category?._payload || []}
                                getOptionLabel={(option) => option.name || ""}
                                value={category?._payload?.find((c) => c._id === categories) || null}
                                onChange={(_, newValue) => setCategories(newValue?._id || "")}
                                sx={{ maxWidth: 400, width: { xs: 300, md: 200 } }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="-Select Categories-"
                                        fullWidth
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                height: 45,              // 👈 input height
                                                minHeight: 40,
                                            },
                                            "& input": {
                                                height: "100%",          // 👈 text stays centered
                                                padding: "20px 14px",
                                            },
                                        }}
                                    />
                                )}
                            />
                        }
                    />
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(`${urls?.PRODUCTS_HANDLER}/`)} >Create Product</Button>
                </Stack>
            </Stack>
            <CustomTable
                rows={data?._payload}
                columns={columns}
                loading={isLoading}
            />
            {data?._payload?.length > 0 && <CustomPagination  {...{ page, page_size, total_records, setPage, totalPages, handlePageSize }} />}
        </Box>
    )
}
