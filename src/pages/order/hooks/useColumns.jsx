import { IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { urls } from '../../../routes';
export default function useColumns() {
    const navigate = useNavigate()
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        {
            id: "orderNo",
            label: "Order No",
            width: 170
        },
        {
            id: "Total Products",
            label: "Total Products",
            renderCell: (row, index) => {
                return row?.items?.length
            },
        },
        {
            id: "name", label: "Name",
            renderCell: (row, index) => {
                return row?.customer?.name
            },
        },
        {
            id: "Mobile", label: "Mobile",
            renderCell: (row, index) => {
                return row?.customer?.mobile
            },
        },
        {
            id: "Pin code", label: "Pin code",
            renderCell: (row, index) => {
                return row?.customer?.pin_code || "-"
            },
        },
        { id: "customerType", label: "Customer Type" },
        { id: "Address", label: "Address" },
        {
            id: "City", label: "City",
            renderCell: (row, index) => {
                return row?.customer?.city || "-"
            },
        },
        {
            id: "state", label: "State",
            renderCell: (row,) => {
                return row?.customer?.state || "-"
            },
        },
        { id: "Transaction Id", label: "Transaction Id" },
        {
            id: "totalDiscount", label: "Total Discount",
            renderCell: (row,) => {
                return row?.totalDiscount || "-"
            },
        },
        {
            id: "Coupon Applied", label: "Coupon Applied",
            renderCell: (row,) => {
                return row?.coupon_applied?.code || "-"
            },
        },
        {
            id: "Grand Total", label: "Grand Total",
            renderCell: (row,) => {
                return row?.summary?.grandTotal || "-"
            },
        },

        {
            id: "Total With tax", label: "Total With tax",
            renderCell: (row,) => {
                return row?.summary?.taxTotal || "-"
            },
        },

        {
            id: "Sub Total", label: "Sub Total",
            renderCell: (row,) => {
                return row?.summary?.subtotal || "-"
            },
        },
        {
            id: "Total Quantity", label: "Total Quantity",
            renderCell: (row,) => {
                return row?.summary?.totalQty || "-"
            },
        },
        { id: "walletAmountUse", label: "Wallet Amount used" },
        { id: "pointUse", label: "Point used" },
        { id: "earnPoints", label: "Earn Points" },
        { id: "Ship Charge	", label: "Ship Charge" },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
            },
            width: 180
        },
        {
            id: "status",
            label: "Status",
            renderCell: (row) => {
                return row?.status
            },
        },
        {
            id: "action",
            label: "Action",
            renderCell: (row) => {
                return (
                    <Stack direction="row" justifyContent="center" gap="10px">
                        <IconButton color="primary" onClick={() => navigate(`details/${row._id}`)}>
                            <RemoveRedEyeIcon />
                        </IconButton>

                    </Stack >
                );
            },
            sticky: true
        },
    ];
    return { columns }
}
