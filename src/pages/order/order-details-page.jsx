import PageStructure from '../../components/PageStructure'
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { CustomPaper } from '../../components'
import { fetchOrders } from '../../services/order'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

export function OrderDetailsPage() {
    const { order_id } = useParams()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['orders',],
        queryFn: ({ signal }) => fetchOrders(signal, 0, 1, "", { orderId: order_id }),
        enabled: !!order_id
    })
    const ORDER_STATUSES = [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Completed', value: 'completed' },
        { label: 'Refunded', value: 'refunded' },
    ];
    console.log(data);



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
                                            <TextField select sx={{ width: "200px" }} size='small' value={item.status}>
                                                {
                                                    ORDER_STATUSES?.map(({ label, value }) => {
                                                        return (
                                                            <MenuItem value={value} key={value}>
                                                                {label}
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
                                            <Typography variant="body1">
                                                {item?.earnPoints}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Wallet Amount
                                            </Typography>
                                            <Typography variant="body1">
                                                ₹{item?.customer?.wallet_amount}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body1">
                                                Customer Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.customer?.first_name + " " + item?.customer?.last_name}
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
                                                State
                                            </Typography>
                                            <Typography variant="body1">
                                                {item?.customer?.state}
                                            </Typography>
                                        </Stack>
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
                                                            ₹{Number(it?.taxAmount).toFixed(2)}
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
                                                    Tax
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
                                                <Typography variant="body1" fontWeight="bold" width="20%">
                                                    Discount
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.coupon_applied.code ? item?.coupon_applied?.amount : item?.totalDiscount || 0}
                                                </Typography>
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
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    {item?.earnPoints}
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
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    {item?.pointUse}
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
                                                    Sub Total
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="10%" textAlign="center" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="20%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right" />
                                                <Typography variant="body1" fontWeight="bold" width="15%" textAlign="right">
                                                    ₹{item?.summary?.subtotal?.toFixed(2)}
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
