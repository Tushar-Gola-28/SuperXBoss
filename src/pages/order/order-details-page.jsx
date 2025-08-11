import PageStructure from '../../components/PageStructure'
import { Backdrop, Box, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { CustomPaper } from '../../components'
import { fetchOrders, updateOrder } from '../../services/order'
import { useParams } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

export function OrderDetailsPage() {
    const { order_id } = useParams()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['orders',],
        queryFn: ({ signal }) => fetchOrders(signal, 0, 1, "", { orderId: order_id }),
        enabled: !!order_id
    })
    const ORDER_STATUSES = [
        // { label: 'Pending', value: 'pending', color: 'orange' },
        { label: 'Confirmed', value: 'confirmed', color: 'blue' },
        { label: 'Cancelled', value: 'cancelled', color: 'red' },
        { label: 'Shipped', value: 'shipped', color: 'purple' },
        { label: 'Completed', value: 'completed', color: 'green' },
        { label: 'Refunded', value: 'refunded', color: 'gray' },
    ]
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateOrder(data)
        },
    })

    const handleStatus = (order_id, status, customer) => {
        updateMutation.mutate({ order_id, status, customer }, {
            onSuccess: (res) => {
                if (res) {
                    refetch()
                }

            }
        })
    }
    if (isLoading) {
        return <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return (
        <PageStructure title="Order Details">
            {
                data?._payload?.map((item) => {
                    return (
                        <Stack key={item._id} spacing={1}>
                            <CustomPaper>
                                <Stack>
                                    <Stack sx={{ borderBottom: 1, borderColor: "divider", pb: .5 }}>
                                        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                                            Basic Info
                                        </Typography>
                                    </Stack>
                                    <Stack mt={1} spacing={1}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Order Status
                                            </Typography>
                                            <TextField select sx={{ width: "200px" }} size='small' value={item.status}
                                                onChange={(e) => handleStatus(item._id, e.target.value, item.customer_id)}
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


                                            </TextField>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Order No
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.orderNo}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Order Time
                                            </Typography>
                                            <Typography variant="body1">
                                                {dayjs(item?.createdAt).format("DD-MM-YYYY hh:mm A")}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Earn Points
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: "green" }}>
                                                +{item?.earnPoints} (₹{item?.earnPoints * 0.90})
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Wallet Amount Use
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: "red" }}>
                                                -₹{item?.customer?.wallet_amount}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Customer Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.customer?.name}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Customer Mobile No
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.customer?.mobile}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Customer Email
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.customer?.email}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Order Status UpdateBy
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.updatedBy?.name}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Total Discount
                                            </Typography>
                                            <Typography variant="h5" sx={{ color: "red" }}>
                                                -₹{item?.totalDiscount}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Total Customer Paid
                                            </Typography>
                                            <Typography variant="h5" sx={{ color: "primary.main" }}>
                                                ₹{item?.summary?.grandTotal}
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </CustomPaper>
                            <CustomPaper>
                                <Stack spacing={1}>
                                    <Stack sx={{ borderBottom: 1, borderColor: "divider", pb: .5 }}>
                                        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                                            Delivery Address Information
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Name
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.name || "-"}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Mobile
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.mobile || "-"}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Shipping Charges
                                        </Typography>
                                        <Typography variant="body1">
                                            ₹{item?.shippingChargesAmount?.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            State
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.state}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            City
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.city}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Address
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.address}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Address Label
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.label}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1">
                                            Pin Code
                                        </Typography>
                                        <Typography variant="body1">
                                            {item?.address?.pinCode || "-"}
                                        </Typography>
                                    </Stack>

                                </Stack>
                            </CustomPaper>
                            <CustomPaper>
                                <Stack>
                                    <Stack sx={{ borderBottom: 1, borderColor: "divider", pb: .5 }}>
                                        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                                            Order Placed Products Details
                                        </Typography>
                                    </Stack>


                                    <Stack mt={1} spacing={1}>

                                        {
                                            item.items?.map((it, index) => {
                                                return (
                                                    <CustomPaper key={index}>
                                                        <Stack spacing={1}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Name
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.name}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product SKU ID
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.sku_id}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Qty
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.qty}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Price
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    ₹{it?.unitPrice}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Discount Type
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.discountType}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Discount Applied
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.applied_discount}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Discount Price
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    ₹{it?.effectiveUnitPrice}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Tax
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.taxPct}%
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Tax Amount
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    ₹{it?.taxAmount}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product (Item * qty)
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    ₹{it?.lineSubtotal}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product (Item * qty) + Tax
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    ₹{it?.lineTotal}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography variant="body1">
                                                                    Product Points
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {it?.point}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </CustomPaper>
                                                )
                                            })
                                        }

                                    </Stack>
                                </Stack>
                            </CustomPaper>
                            <CustomPaper>
                                <Stack>
                                    <Stack sx={{ borderBottom: 1, borderColor: "divider", pb: .5 }}>
                                        <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                                            Order Summary
                                        </Typography>
                                    </Stack>
                                    {/* Table Headers */}
                                    <Box sx={{ overflowX: "auto" }}>
                                        <Box minWidth={900}>
                                            <Stack direction="row" justifyContent="space-between" px={2} py={1} mb={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Product Name
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right">
                                                    Price
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center">
                                                    Qty
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right">
                                                    Discounted Price
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right">
                                                    Tax Amount
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    Sub Total
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    Grand Total
                                                </Typography>
                                            </Stack>

                                            {/* Product Rows */}
                                            <Stack spacing={1}>
                                                {item.items?.map((it, index) => (
                                                    <Stack
                                                        key={index}
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        px={2}
                                                        py={0.5}
                                                    >
                                                        <Typography variant="body2" width="20%">
                                                            {it?.name}
                                                        </Typography>
                                                        <Typography variant="body2" width="10%" textAlign="right">
                                                            ₹{Number(it?.unitPrice).toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" width="10%" textAlign="center">
                                                            {it?.qty}
                                                        </Typography>
                                                        <Typography variant="body2" width="20%" textAlign="right">
                                                            ₹{Number(it?.effectiveUnitPrice).toFixed(2)} × {it.qty}
                                                        </Typography>
                                                        <Typography variant="body2" width="20%" textAlign="right">
                                                            ₹{Number(it?.taxAmount).toFixed(2)} ({it.taxPct}% Tax)
                                                        </Typography>
                                                        <Typography variant="body2" width="15%" textAlign="right">
                                                            ₹{Number(it?.lineSubtotal).toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" width="15%" textAlign="right">
                                                            ₹{Number(it?.lineTotal).toFixed(2)}
                                                        </Typography>
                                                    </Stack>
                                                ))}
                                            </Stack>



                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Earn Points
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" sx={{ color: "green" }}>
                                                    +{item?.earnPoints} (₹{item?.earnPoints * 0.90})
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Use Points
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" sx={{ color: "red" }}>
                                                    -{item?.pointUse} (₹{item?.pointUse * 0.90})
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Use Wallet Amount
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.walletAmountUse}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Total Discount
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" sx={{ color: "red" }}>
                                                    -₹{item?.coupon_applied.code ? item?.coupon_applied?.amount : item?.totalDiscount || 0}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Total Tax
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.summary?.taxTotal?.toFixed(2)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="40%">
                                                    Total Product Amount After Discount (Including Tax)
                                                </Typography>
                                                {/* <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" /> */}
                                                {/* <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" /> */}
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item.items?.reduce((acc, curr) => acc + (curr.lineTotal), 0)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Shipping Charges
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.shippingChargesAmount?.toFixed(2)}
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Sub Total
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{(item?.summary?.subtotal + item?.shippingChargesAmount || 0).toFixed(2)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={1} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Platform Charges
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.platformCharge?.toFixed(2)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" px={3} mt={1} pt={2} pb={2} borderTop="1px solid #ccc">
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Grand Total
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right">
                                                    ₹{item.items?.reduce((acc, curr) => acc + curr.unitPrice, 0)}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center">
                                                    {item.items?.reduce((acc, curr) => acc + curr.qty, 0)}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right">
                                                    {/* ₹{item.items?.reduce((acc, curr) => acc + (curr.effectiveUnitPrice || 0) * curr.qty, 0).toFixed(2)} */}
                                                    ₹{item?.coupon_applied.code ? item?.coupon_applied?.amount : item?.totalDiscount || 0} × {item.items?.reduce((acc, curr) => acc + curr.qty, 0)}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right">
                                                    ₹{item.items?.reduce((acc, curr) => acc + (curr.taxAmount || 0), 0).toFixed(2)}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item.items?.reduce((acc, curr) => acc + (curr.lineSubtotal || 0), 0).toFixed(2)}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" sx={{ color: "primary.main" }}>
                                                    ₹{item?.summary?.grandTotal?.toFixed(2)}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Box>
                                    {/* Totals Row (Sticky-style, not scrolling) */}


                                </Stack>
                            </CustomPaper>
                        </Stack>
                    )
                })
            }

        </PageStructure>
    )
}
