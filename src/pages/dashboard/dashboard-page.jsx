import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
    useTheme,
    useMediaQuery,
    Grid2
} from '@mui/material';
import {
    People as PeopleIcon,
    ShoppingBag as ShoppingBagIcon,
    Category as CategoryIcon,
    Star as BrandIcon,
    ShoppingCart as OrderIcon,
    Person as UserIcon
} from '@mui/icons-material';

export const DashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sample data - replace with your actual data
    const stats = {
        brands: 0,
        customers: 0,
        products: 0,
        categories: 6,
        orders: 0,
        users: 2
    };

    const StatCard = ({ icon, title, value, color }) => {
        const IconComponent = icon;

        return (
            <Card
                sx={{
                    height: '100%',
                    borderLeft: `4px solid ${color}`,
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }}
            >
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        <IconComponent
                            sx={{
                                fontSize: 30,
                                color: color,
                                mr: 1.5
                            }}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ fontWeight: 600 }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ p: isMobile ? 2 : 3 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 3
                }}
            >
                Dashboard
            </Typography>

            <Grid2 container spacing={3} sx={{ mb: 4 }}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={BrandIcon}
                        title="Total Brand"
                        value={stats.brands}
                        color={theme.palette.warning.main}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={PeopleIcon}
                        title="Total Customer"
                        value={stats.customers}
                        color={theme.palette.info.main}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={ShoppingBagIcon}
                        title="Total Product"
                        value={stats.products}
                        color={theme.palette.success.main}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={CategoryIcon}
                        title="Total Categories"
                        value={stats.categories}
                        color={theme.palette.secondary.main}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={OrderIcon}
                        title="Total Order"
                        value={stats.orders}
                        color={theme.palette.error.main}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <StatCard
                        icon={UserIcon}
                        title="Total User"
                        value={stats.users}
                        color={theme.palette.primary.main}
                    />
                </Grid2>
            </Grid2>

        </Box>
    );
};
