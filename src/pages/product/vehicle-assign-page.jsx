import {
    Button, Checkbox, Grid2, ListItemText, MenuItem, Select, Stack, Typography
} from '@mui/material';
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
    console.log(brandCategory, "brandCategory");

    const { data: storeData } = useQuery({
        queryKey: ["vehicle brands get"],
        queryFn: ({ signal }) => getVehicleAssign(signal, product)
    });

    const [ids, setIds] = useState({});

    useEffect(() => {
        if (storeData?._payload && data?._payload) {
            setIds(storeData._payload);
        }

    }, [storeData?._payload, data?._payload, brandCategory?._payload]);

    const handleChange = (brandId) => (event) => {
        const {
            target: { value },
        } = event;

        const vehicles = typeof value === 'string' ? value.split(',') : value;

        setIds((prev) => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                vehicles: vehicles,
            },
        }));
    };
    const handleChangeCategory = (brandId, categories) => {
        setIds((prev) => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                categories,
            },
        }));
    };

    const handleChange2 = (brandId) => (event) => {

        const {
            target: { value },
        } = event;
        setIds((prev) => ({
            ...prev,
            [brandId]: {
                ...(prev[brandId] || {}),
                status: value,
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

    return (
        <PageStructure title="Product Assign">
            <Stack maxWidth={700}>
                <CustomPaper>
                    <Stack sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{ color: "primary.main" }}>
                            *Brand And Vehicle(Modal) Assign
                        </Typography>
                    </Stack>
                    <Grid2 container spacing={1}>
                        {data?._payload?.map((brand) => {
                            const selected = ids[brand._id] || {};
                            const selectedVehicles = selected.vehicles || [];

                            return (
                                <Grid2 size={{ xs: 12, md: 6 }} key={brand._id}>
                                    <CustomPaper>
                                        <Typography variant="h5">{brand.name}</Typography>
                                        <Stack mt={1}>
                                            <Select
                                                fullWidth
                                                multiple
                                                value={selectedVehicles}
                                                onChange={handleChange(brand._id)}
                                                renderValue={(selected) =>
                                                    selected
                                                        .map((id) =>
                                                            brand.vehicles.find((v) => v._id === id)?.name
                                                        )
                                                        .filter(Boolean)
                                                        .join(', ')
                                                }
                                            >
                                                {brand.vehicles?.map((vehicle) => (
                                                    <MenuItem key={vehicle._id} value={vehicle._id}>
                                                        <Checkbox checked={selectedVehicles.includes(vehicle._id)} />
                                                        <ListItemText primary={vehicle.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <Typography variant="caption" textAlign="end">
                                                *Select Vehicle Models
                                            </Typography>

                                            <CustomRadio
                                                name={`status-${brand._id}`}
                                                title="Status"
                                                value={String(selected.status)}
                                                handleChange={handleChange2(brand._id)}
                                                options={[
                                                    { value: "true", label: "Active" },
                                                    { value: "false", label: "In Active" },
                                                ]}
                                            />
                                        </Stack>
                                    </CustomPaper>
                                </Grid2>
                            );
                        })}
                    </Grid2>
                </CustomPaper>
                <CustomPaper sx={{ mt: 1 }}>
                    <Stack sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{ color: "primary.main" }}>
                            *Brand And Category(Modal) Assign
                        </Typography>
                    </Stack>
                    <Grid2 container spacing={1}>
                        {brandCategory?._payload?.map((brand) => {

                            const selected = ids[brand.brand._id] || {};

                            return (
                                <Grid2 size={{ xs: 12, }} key={brand?.brand._id}>
                                    <CustomPaper>
                                        <Typography variant="h5">{brand?.brand.name}</Typography>
                                        <Stack mt={1}>
                                            <CategoryTree
                                                categories={brand.categories}
                                                onSelectedChange={(ids) => handleChangeCategory(String(brand.brand._id), ids)}
                                                defaultSelected={selected.categories || []}

                                            />
                                            <Typography variant="caption" textAlign="end">
                                                *Select Category Models
                                            </Typography>

                                            <CustomRadio
                                                name={`status-${brand._id}`}
                                                title="Status"
                                                value={String(selected.status)}
                                                handleChange={handleChange2(brand.brand._id)}
                                                options={[
                                                    { value: "true", label: "Active" },
                                                    { value: "false", label: "In Active" },
                                                ]}
                                            />
                                        </Stack>
                                    </CustomPaper>
                                </Grid2>
                            );
                        })}
                    </Grid2>
                </CustomPaper>
            </Stack>

            <Stack direction="row" mt={4} gap={2}>
                <LoadingButton
                    variant="contained"
                    onClick={handleSubmit}
                    loading={createMutation.isPending}
                    disabled={createMutation.isPending}
                >
                    Create
                </LoadingButton>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </Stack>
        </PageStructure>
    );
}
