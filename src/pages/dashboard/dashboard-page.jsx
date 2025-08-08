import React, { useMemo } from 'react';
import {
    Box, Typography, Card, useTheme, useMediaQuery, Grid2,
    Backdrop,
    CircularProgress
} from '@mui/material';
import Chart from "react-apexcharts";
import DonutCard from '../../components/ui/DonutCard';
import { useQuery } from '@tanstack/react-query';
import { fetchOverView } from '../../services/dashboard';

const colors = ["#0276E5", "#8338EC80", "#8338EC", "#2494FF", "#40A2E3", "#41C9E2", "#5356FF"];
const getStatusDotStyle = {
    height: "15px",
    width: "15px",
    display: "inline-block",
    marginRight: "10px",
};
const getChartOptions = (labels) => ({
    labels,
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

export const DashboardPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { data, isLoading } = useQuery({
        queryKey: ["fetchOverView"],
        queryFn: ({ signal }) => fetchOverView(signal)
    });

    const overviewCards = useMemo(() => {
        if (!data) return [];

        return [
            {
                title: "Total Brand",
                series: [data.brand?.active || 0, data.brand?.inActive || 0],
                labels: ["Active Brands", "In Active Brands"],
                render: () => {
                    return (
                        <Box>

                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[0],
                                    }}
                                ></span>
                                {"  "}
                                {!isNaN(data.brand?.active)
                                    ? data.brand?.active
                                    : 0} {" "}
                                Active Brands
                            </Typography>
                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[1],
                                    }}
                                ></span>{" "}
                                {!isNaN(data.brand?.inActive)
                                    ? data.brand?.inActive
                                    : 0} {" "}
                                In Active Brands
                            </Typography>
                        </Box>
                    )
                }
            },
            {
                title: "Total Categories",
                series: [data.categories?.active || 0, data.categories?.inActive || 0],
                labels: ["Active Categories", "In Active Categories"],
                render: () => {
                    return (
                        <Box>

                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[0],
                                    }}
                                ></span>
                                {"  "}
                                {!isNaN(data.categories?.active)
                                    ? data.categories?.active
                                    : 0} {" "}
                                Active Categories
                            </Typography>
                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[1],
                                    }}
                                ></span>{" "}
                                {!isNaN(data.categories?.inActive)
                                    ? data.categories?.inActive
                                    : 0} {" "}
                                In Active Categories
                            </Typography>
                        </Box>
                    )
                }
            },
            {
                title: "Total Products",
                series: [data.products?.active || 0, data.products?.inActive || 0],
                labels: ["Active Products", "InActive Products"],
                render: () => {
                    return (
                        <Box>

                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[0],
                                    }}
                                ></span>
                                {"  "}
                                {!isNaN(data.products?.active)
                                    ? data.products?.active
                                    : 0} {" "}
                                Active Products
                            </Typography>
                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[1],
                                    }}
                                ></span>{" "}
                                {!isNaN(data.products?.inActive)
                                    ? data.products?.inActive
                                    : 0} {" "}
                                In Active Products
                            </Typography>
                        </Box>
                    )
                }
            },
            {
                title: "Total Customers",
                series: [data.customers?.active || 0, data.customers?.inactive || 0],
                labels: ["Active Customers", "In Active Customers"],
                render: () => {
                    return (
                        <Box>

                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[0],
                                    }}
                                ></span>
                                {"  "}
                                {!isNaN(data.customers?.active)
                                    ? data.customers?.active
                                    : 0} {" "}
                                Active Customers
                            </Typography>
                            <Typography variant="body2">
                                <span
                                    style={{
                                        ...getStatusDotStyle,
                                        backgroundColor: colors[1],
                                    }}
                                ></span>{" "}
                                {!isNaN(data.customers?.inActive)
                                    ? data.customers?.inActive
                                    : 0} {" "}
                                In Active Customers
                            </Typography>
                        </Box>
                    )
                }
            },
            {
                title: "Total Orders",
                series: [data.orders?.completed || 0, data.orders?.pending || 0, data.orders?.cancelled || 0, data.orders?.shipped || 0, data.orders?.confirmed || 0, data.orders?.refunded || 0],
                labels: ["Completed Orders", "Pending Orders", "Cancelled Orders", "Shipped Orders", "Confirmed Orders", "Refunded Orders"],
                render: () => {
                    const orderKeys = Object.keys(data.orders || {});
                    return (
                        <Box>
                            {orderKeys.map((key, index) => (
                                <Typography variant="body2" key={key}>
                                    <span
                                        style={{
                                            ...getStatusDotStyle,
                                            backgroundColor: colors[index % colors.length],
                                        }}
                                    ></span>
                                    {" "}
                                    {!isNaN(data.orders?.[key]) ? data.orders[key] : 0}{" "}
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Orders
                                </Typography>
                            ))}
                        </Box>
                    );
                },
            },
        ];
    }, [data]);
    if (isLoading) {
        return <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

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

            <Grid2 container spacing={1} sx={{ mb: 4 }}>
                {overviewCards.map((card, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card sx={{ p: 2 }}>
                            <Typography variant="h4" sx={{ fontSize: "16px" }}>
                                {card.title}
                            </Typography>
                            <DonutCard>
                                <Chart
                                    type="donut"
                                    series={card.series}
                                    options={getChartOptions(card.labels)}
                                    height={230}
                                />
                                {
                                    card.render ? card.render() : ''
                                }
                            </DonutCard>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};
