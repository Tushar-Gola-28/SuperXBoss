import { IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import { urls } from '../../../routes';
export default function useColumns() {
    const navigate = useNavigate()
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        { id: "code", label: "Code" },
        { id: "amount", label: "Amount" },
        { id: "min_cart_amt", label: "Minimum Amount" },
        {
            id: "Start Date",
            label: "Start Date",
            renderCell: (row) => {
                return dayjs(row?.start_date).format("DD MMMM YYYY, h:mm A");
            },
            width: 250
        },
        {
            id: "End Date",
            label: "End Date",
            renderCell: (row) => {
                return dayjs(row?.end_date).format("DD MMMM YYYY, h:mm A");
            },
            width: 200
        },

        {
            id: "user", label: "Create By", renderCell: (row) => {
                return row?.createdBy?.name || "-"
            },
        },
        {
            id: "Update", label: "Update By", renderCell: (row) => {
                return row?.updatedBy?.name || "-"
            },
        },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
            },
            width: 200
        },
        {
            id: "updateAt",
            label: "UpdatedAt",
            renderCell: (row) => {
                return dayjs(row?.updatedAt).format("DD MMMM YYYY, h:mm A");
            },
            width: 200
        },
        {
            id: "status",
            label: "Status",
            renderCell: (row) => {
                return row?.status ? (
                    <div className="active">Active</div>
                ) : (
                    <div className="pending">In Active</div>
                );
            },
        },
        {
            id: "action",
            label: "Action",
            renderCell: (row) => {
                return (
                    <Stack direction="row" justifyContent="center" gap="10px">
                        <IconButton color="primary" onClick={() => navigate(`${urls.COUPON_HANDLER}/${row?._id}`, { state: row })}>
                            <EditIcon />
                        </IconButton>
                    </Stack >
                );

            },
            sticky: true
        },
    ];
    return { columns }
}
