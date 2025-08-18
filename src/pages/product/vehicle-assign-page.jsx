// import {
//     Box,
//     Button, Checkbox, Grid2, ListItemText, MenuItem, Select, Stack, Tab, Tabs, Typography
// } from '@mui/material';
// import PageStructure from '../../components/PageStructure';
// import { CustomPaper, CustomRadio, notify } from '../../components';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { fetchBrandCategory, fetchVehicleBrand } from '../../services/brands';
// import { useEffect, useState } from 'react';
// import { LoadingButton } from '@mui/lab';
// import { createVehicleAssign, getVehicleAssign } from '../../services/product';
// import { useNavigate, useParams } from 'react-router';
// import CategoryTree from './CategoryTree';

// export function VehicleAssignPage() {
//     const navigate = useNavigate();
//     const { product } = useParams();

//     const { data } = useQuery({
//         queryKey: ["vehicle brands"],
//         queryFn: ({ signal }) => fetchVehicleBrand(signal, "Vehicle")
//     });
//     const { data: brandCategory } = useQuery({
//         queryKey: ["brands category"],
//         queryFn: ({ signal }) => fetchBrandCategory(signal, "Vehicle")
//     });

//     const { data: storeData } = useQuery({
//         queryKey: ["vehicle brands get"],
//         queryFn: ({ signal }) => getVehicleAssign(signal, product)
//     });



//     const [ids, setIds] = useState({});

//     useEffect(() => {
//         if (storeData?._payload && data?._payload) {
//             setIds(storeData._payload);
//         }

//     }, [storeData?._payload, data?._payload, brandCategory?._payload]);

//     const handleChange = (brandId) => (event) => {
//         const {
//             target: { value },
//         } = event;

//         const vehicles = typeof value === 'string' ? value.split(',') : value;

//         setIds((prev) => ({
//             ...prev,
//             [brandId]: {
//                 ...(prev[brandId] || {}),
//                 vehicles: vehicles,
//             },
//         }));
//     };
//     const handleChangeCategory = (brandId, categories) => {
//         setIds((prev) => ({
//             ...prev,
//             [brandId]: {
//                 ...(prev[brandId] || {}),
//                 categories,
//             },
//         }));
//     };

//     const handleChange2 = (brandId) => (event) => {

//         const {
//             target: { value },
//         } = event;
//         setIds((prev) => ({
//             ...prev,
//             [brandId]: {
//                 ...(prev[brandId] || {}),
//                 status: value,
//             }
//         }));
//     };

//     const createMutation = useMutation({
//         mutationFn: async (data) => await createVehicleAssign(data),
//     });


//     const handleSubmit = () => {
//         const data = {
//             assign_data: ids,
//             product_id: product,
//         };

//         createMutation.mutate(data, {
//             onSuccess: (data) => {
//                 if (data) {
//                     notify("Product Assign Successfully.", "success");
//                     navigate(-1);
//                 }
//             }
//         });
//     };
//     function CustomTabPanel(props) {
//         const { children, value, index, ...other } = props;

//         return (
//             <div
//                 hidden={value !== index}
//                 {...other}
//             >
//                 {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
//             </div>
//         );
//     }

//     function a11yProps(index) {
//         return {
//             id: `simple-tab-${index}`,
//             'aria-controls': `simple-tabpanel-${index}`,
//         };
//     }
//     const [value, setValue] = useState(0);

//     const handleChange3 = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <PageStructure title="Product Assign">
//             <Stack maxWidth={800}>
//                 <Box sx={{ display: "flex" }}>

//                     <Box sx={{ border: 1, borderColor: 'divider', borderRadius: "6px", }}>
//                         <Tabs value={value} onChange={handleChange3} aria-label="basic tabs example" variant="scrollable">
//                             <Tab label={`*Brand And Vehicle(Model) Assign`} {...a11yProps(0)} sx={{ textTransform: "initial" }} />
//                             <Tab label={`*Brand And Category Assign`} {...a11yProps(1)} sx={{ textTransform: "initial" }} />
//                         </Tabs>
//                     </Box>
//                 </Box>
//                 <CustomTabPanel value={value} index={0}>
//                     <CustomPaper sx={{ mt: 2 }}>
//                         <Stack sx={{ mb: 2 }}>
//                             <Typography variant="h5" sx={{ color: "primary.main" }}>
//                                 *Brand And Vehicle(Model) Assign
//                             </Typography>
//                         </Stack>
//                         <Grid2 container spacing={1}>
//                             {data?._payload?.map((brand) => {
//                                 const selected = ids[brand._id] || {};
//                                 const selectedVehicles = selected.vehicles || [];

//                                 return (
//                                     <Grid2 size={{ xs: 12, md: 6 }} key={brand._id}>
//                                         <CustomPaper>
//                                             <Typography variant="h5">{brand.name}</Typography>
//                                             <Stack mt={1}>
//                                                 <Select
//                                                     fullWidth
//                                                     multiple
//                                                     value={selectedVehicles}
//                                                     onChange={handleChange(brand._id)}
//                                                     renderValue={(selected) =>
//                                                         selected
//                                                             .map((id) =>
//                                                                 brand.vehicles.find((v) => v._id === id)?.name
//                                                             )
//                                                             .filter(Boolean)
//                                                             .join(', ')
//                                                     }
//                                                     MenuProps={{
//                                                         PaperProps: {
//                                                             style: {
//                                                                 maxHeight: 300,
//                                                             },
//                                                         },
//                                                         disableAutoFocusItem: true,   // prevent focus stealing
//                                                         disableCloseOnSelect: true
//                                                     }}
//                                                 >
//                                                     {brand.vehicles?.map((vehicle) => (
//                                                         <MenuItem key={vehicle._id} value={vehicle._id}  >
//                                                             <Checkbox checked={selectedVehicles.includes(vehicle._id)} />
//                                                             <ListItemText primary={`${vehicle.name} (${vehicle.start_year} - ${vehicle.end_year})`} />
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                                 <Typography variant="caption" textAlign="end">
//                                                     *Select Vehicle Models
//                                                 </Typography>

//                                                 <CustomRadio
//                                                     name={`status-${brand._id}`}
//                                                     title="Status"
//                                                     value={String(selected.status)}
//                                                     handleChange={handleChange2(brand._id)}
//                                                     options={[
//                                                         { value: "true", label: "Active" },
//                                                         { value: "false", label: "In Active" },
//                                                     ]}
//                                                 />
//                                             </Stack>
//                                         </CustomPaper>
//                                     </Grid2>
//                                 );
//                             })}
//                         </Grid2>
//                     </CustomPaper>
//                 </CustomTabPanel>
//                 <CustomTabPanel value={value} index={1}>
//                     <CustomPaper sx={{ mt: 1 }}>
//                         <Stack sx={{ mb: 2 }}>
//                             <Typography variant="h5" sx={{ color: "primary.main" }}>
//                                 *Brand And Category(Model) Assign
//                             </Typography>
//                         </Stack>
//                         <Grid2 container spacing={1}>
//                             {brandCategory?._payload?.map((brand) => {

//                                 const selected = ids[brand.brand._id] || {};

//                                 return (
//                                     <Grid2 size={{ xs: 12, }} key={brand?.brand._id}>
//                                         <CustomPaper>
//                                             <Typography variant="h5">{brand?.brand.name}</Typography>
//                                             <Stack mt={1}>
//                                                 <CategoryTree
//                                                     categories={brand.categories}
//                                                     onSelectedChange={(ids) => handleChangeCategory(String(brand.brand._id), ids)}
//                                                     defaultSelected={selected.categories || []}

//                                                 />
//                                                 <Typography variant="caption" textAlign="end">
//                                                     *Select Category Models
//                                                 </Typography>

//                                                 <CustomRadio
//                                                     name={`status-${brand._id}`}
//                                                     title="Status"
//                                                     value={String(selected.status)}
//                                                     handleChange={handleChange2(brand.brand._id)}
//                                                     options={[
//                                                         { value: "true", label: "Active" },
//                                                         { value: "false", label: "In Active" },
//                                                     ]}
//                                                 />
//                                             </Stack>
//                                         </CustomPaper>
//                                     </Grid2>
//                                 );
//                             })}
//                         </Grid2>
//                     </CustomPaper>
//                 </CustomTabPanel>


//             </Stack>

//             <Stack direction="row" mt={4} gap={2}>
//                 <LoadingButton
//                     variant="contained"
//                     onClick={handleSubmit}
//                     loading={createMutation.isPending}
//                     disabled={createMutation.isPending}
//                 >
//                     Create
//                 </LoadingButton>
//                 <Button variant="outlined" onClick={() => navigate(-1)}>
//                     Cancel
//                 </Button>
//             </Stack>
//         </PageStructure>
//     );
// }


import {
    Box,
    Button, Checkbox, ListItemText, MenuItem, Select, Stack, Tab, Tabs, Typography,
    Autocomplete, TextField, Chip,
    Paper
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import PageStructure from '../../components/PageStructure';
import { CustomPaper, CustomRadio, notify } from '../../components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchBrandCategory, fetchVehicleBrand } from '../../services/brands';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { createVehicleAssign, getVehicleAssign } from '../../services/product';
import { useNavigate, useParams } from 'react-router';
import CategoryTree from './CategoryTree';

export function VehicleAssignPage() {
    const navigate = useNavigate();
    const { product } = useParams();

    const { data } = useQuery({
        queryKey: ["vehicle brands"],
        queryFn: ({ signal }) => fetchVehicleBrand(signal, "Vehicle")
    });
    const { data: brandCategory } = useQuery({
        queryKey: ["brands category"],
        queryFn: ({ signal }) => fetchBrandCategory(signal, "Vehicle")
    });

    const { data: storeData } = useQuery({
        queryKey: ["vehicle brands get"],
        queryFn: ({ signal }) => getVehicleAssign(signal, product)
    });

    const [ids, setIds] = useState({});
    const [value, setValue] = useState("one");

    useEffect(() => {
        if (storeData?._payload && data?._payload) {
            setIds(storeData._payload);
        }
    }, [storeData?._payload, data?._payload, brandCategory?._payload]);

    const handleVehicleChange = (brandId, vehicles) => {
        setIds(prev => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                vehicles: vehicles.map(v => v._id),
            },
        }));
    };

    const handleChangeCategory = (brandId, categories) => {
        setIds(prev => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                categories,
            },
        }));
    };

    const handleStatusChange = (brandId) => (event) => {
        setIds(prev => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                status: event.target.value,
            }
        }));
    };

    const createMutation = useMutation({
        mutationFn: async (data) => await createVehicleAssign(data),
    });

    const handleSubmit = () => {
        const data = {
            assign_data: ids,
            product_id: product,
        };

        createMutation.mutate(data, {
            onSuccess: (data) => {
                if (data) {
                    notify("Product Assign Successfully.", "success");
                    navigate(-1);
                }
            }
        });
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}  {...other}>
                {value === index && <Box sx={{ p: 1 }} onClick={(e) => e.stopPropagation()}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <PageStructure title="Product Assign">
            <Stack maxWidth={1200} mx="auto">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        aria-label="assignment tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Brand & Vehicle Assign" value="one" sx={{ textTransform: "none", fontWeight: 600 }} />
                        <Tab label="Brand & Category Assign" value={"two"} sx={{ textTransform: "none", fontWeight: 600 }} />
                    </Tabs>
                </Box>

                {value == "one" && <CustomPaper sx={{ mt: 2, p: 3 }}>
                    <Typography variant="h6" sx={{ color: "primary.main", mb: 3 }}>
                        Assign Vehicles to Brands
                    </Typography>
                    <Grid container spacing={3}>
                        {data?._payload?.map((brand) => {
                            const selected = ids[brand._id] || {};
                            const selectedVehicleIds = selected.vehicles || [];
                            const selectedVehicles = brand.vehicles?.filter(v => selectedVehicleIds.includes(v._id)) || [];

                            return (
                                <Grid size={{ xs: 12, md: 6 }} key={brand._id}>
                                    <CustomPaper sx={{ p: 2, height: "100%" }}>
                                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                            {brand.name}
                                        </Typography>

                                        <Autocomplete
                                            multiple
                                            options={brand.vehicles || []}
                                            getOptionLabel={(option) => `${option.name} (${option.start_year}-${option.end_year})`}
                                            value={selectedVehicles}
                                            onChange={(e, newValue) => handleVehicleChange(brand._id, newValue)}
                                            filterOptions={(options, { inputValue }) => {
                                                const norm = (s) =>
                                                    (s ?? "")
                                                        .toLowerCase()
                                                        .replace(/\s+/g, " ") // collapse multiple spaces
                                                        .trim();
                                                const q = norm(inputValue);
                                                return options.filter(o => (o.name || "").toLowerCase().includes(q));
                                            }}
                                            disableCloseOnSelect
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Vehicle Models"
                                                    placeholder="Search or select vehicles..."
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                />
                                            )}
                                            renderTags={(value, getTagProps) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {value.map((option, index) => (
                                                        <Chip
                                                            {...getTagProps({ index })}
                                                            key={option._id}
                                                            label={`${option.name} (${option.start_year}-${option.end_year})`}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: 'primary.light',
                                                                color: 'primary.contrastText',
                                                                '& .MuiChip-deleteIcon': {
                                                                    color: 'primary.contrastText',
                                                                },
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <MenuItem
                                                    {...props}
                                                    sx={{
                                                        backgroundColor: selected ? 'action.selected' : 'background.paper',
                                                        '&:hover': {
                                                            backgroundColor: 'action.hover',
                                                        },
                                                    }}
                                                    onClick={(e) => {
                                                        // Prevent default to stop auto-scrolling
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const newSelected = selectedVehicles.includes(option)
                                                            ? selectedVehicles.filter(v => v._id !== option._id)
                                                            : [...selectedVehicles, option];
                                                        handleVehicleChange(brand._id, newSelected);
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={selected}
                                                        sx={{
                                                            color: 'primary.main',
                                                            '&.Mui-checked': {
                                                                color: 'primary.main',
                                                            },
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary={`${option.name} (${option.start_year}-${option.end_year})`}
                                                    />
                                                </MenuItem>
                                            )}
                                            sx={{
                                                '& .MuiAutocomplete-inputRoot': {
                                                    padding: '5px 9px',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                },
                                            }}
                                        />
                                        <Stack mt={2}>
                                            <CustomRadio
                                                name={`status-${brand._id}`}
                                                title="Status"
                                                value={String(selected.status || "true")}
                                                handleChange={handleStatusChange(brand._id)}
                                                options={[
                                                    { value: "true", label: "Active" },
                                                    { value: "false", label: "Inactive" },
                                                ]}
                                                row
                                            />
                                        </Stack>
                                    </CustomPaper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CustomPaper>}

                {value == "two" && <CustomPaper sx={{ mt: 2, p: 3 }}>
                    <Typography variant="h6" sx={{ color: "primary.main", mb: 3 }}>
                        Assign Categories to Brands
                    </Typography>
                    <Grid container spacing={3}>
                        {brandCategory?._payload?.map((brand) => {
                            const selected = ids[brand.brand._id] || {};

                            return (
                                <Grid size={12} key={brand?.brand._id}>
                                    <CustomPaper sx={{ p: 2 }}>
                                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                            {brand?.brand.name}
                                        </Typography>

                                        <CategoryTree
                                            categories={brand.categories}
                                            onSelectedChange={(ids) =>
                                                handleChangeCategory(String(brand.brand._id), ids)
                                            }
                                            defaultSelected={selected.categories || []}
                                        />

                                        <Typography variant="caption" display="block" gutterBottom sx={{ mt: 1 }}>
                                            *Select categories for this brand
                                        </Typography>

                                        <CustomRadio
                                            name={`status-${brand._id}`}
                                            title="Status"
                                            value={String(selected.status || "true")}
                                            handleChange={handleStatusChange(brand.brand._id)}
                                            options={[
                                                { value: "true", label: "Active" },
                                                { value: "false", label: "Inactive" },
                                            ]}
                                            row
                                        />
                                    </CustomPaper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CustomPaper>}

                <Stack direction="row" justifyContent="flex-end" mt={4} gap={2}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{ minWidth: 120 }}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSubmit}
                        loading={createMutation.isPending}
                        disabled={createMutation.isPending}
                        sx={{ minWidth: 120 }}
                    >
                        Save Assignments
                    </LoadingButton>
                </Stack>
            </Stack>
        </PageStructure>
    );
}