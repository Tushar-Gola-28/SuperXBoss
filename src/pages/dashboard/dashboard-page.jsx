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
import Chart from "react-apexcharts";
import { useChart } from '../../hooks/useChart';
import DonutCard from '../../components/ui/DonutCard';
const colors = [
    "#0276E5",
    "#8338EC80",
    "#8338EC",
    "#2494FF",
    "#40A2E3",
    "#41C9E2",
    "#5356FF",
];
export const DashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // const TotalBrand = useChart({
    //     labels: ["Active Brands ", "In Active Brands"],
    //     colors,
    //     chart: {
    //         type: "donut",
    //         height: 250,
    //         stacked: true,
    //     },
    //     tooltip: {
    //         enabled: true,
    //     },

    //     plotOptions: {
    //         pie: {
    //             donut: {
    //                 labels: {
    //                     show: true,
    //                     total: {
    //                         show: true,
    //                         showAlways: true,
    //                         formatter: function (w) {
    //                             return parseInt(
    //                                 w.globals.seriesTotals.reduce((a, b) => a + b, 0)
    //                             );
    //                         },
    //                         fontSize: "15px",
    //                         fontFamily: "Poppins",
    //                         fontWeight: "500",
    //                         color: "#000000",
    //                     },
    //                 },
    //             },
    //         },
    //     },

    //     legend: {
    //         show: false,
    //     },
    // });
    const TotalBrand = useChart({
        labels: ["Active Brands ", "In Active Brands"],
        colors,
        chart: {
            type: "donut",
            height: 250,
            stacked: true,
        },
        tooltip: {
            enabled: true,
        },

        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            formatter: function (w) {
                                return parseInt(
                                    w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                );
                            },
                            fontSize: "15px",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            color: "#000000",
                        },
                    },
                },
            },
        },

        legend: {
            show: false,
        },
    });



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
                Overview
            </Typography>

            <Grid2 container spacing={3} sx={{ mb: 4 }}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{ pt: 1.5, pl: 1, }}
                    >
                        <Typography variant="h4" sx={{ fontSize: "16px" }}>
                            Total Brand
                        </Typography>
                        <DonutCard>
                            <Chart
                                type="donut"
                                series={[20, 30]}
                                options={TotalBrand}
                                height={250}
                            />
                        </DonutCard>
                    </Card>
                </Grid2>
            </Grid2>

        </Box>
    );
};
