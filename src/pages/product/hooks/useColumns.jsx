import { IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router';
import { HoverAvatar } from '../../../components';
import { urls } from '../../../routes';
export default function useColumns(handleEditData, handleOpenModal) {
    const navigate = useNavigate()
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        {
            id: "icon",
            label: "Photo",
            renderCell: (row) => {
                return (
                    <HoverAvatar
                        src={row?.images[0]}
                        alt="_blank"
                    />

                );
            },
        },
        {
            id: "icon",
            label: "Total Photo",
            renderCell: (row) => {
                return row?.images?.length
            },
        },
        { id: "name", label: "Name" },
        {
            id: "brand", label: "Brand", renderCell: (row) => {
                return row?.brand?.name || "-"
            },
        },
        { id: "customer_price", label: "Customer Price" },
        { id: "b2b_price", label: "B2B_Price" },
        { id: "any_discount", label: "Any Discount" },
        {
            id: "Bulk Discount", label: "Bulk Discount",
            renderCell: (row) => {
                return row?.bulk_discount?.length
            },
        },
        { id: "part_no", label: "Part number" },
        {
            id: "Trend", label: "Trend",
            renderCell: (row) => {
                return row?.trend_part ? (
                    <div className="active">Yes</div>
                ) : (
                    <div className="pending">No</div>
                );
            },
        },
        {
            id: "new_arrival", label: "New Arrival",
            renderCell: (row) => {
                return row?.new_arrival ? (
                    <div className="active">Yes</div>
                ) : (
                    <div className="pending">No</div>
                );
            },
        },
        {
            id: "pop_item", label: "Popular Item",
            renderCell: (row) => {
                return row?.pop_item ? (
                    <div className="active">Yes</div>
                ) : (
                    <div className="pending">No</div>
                );
            },
        },
        { id: "item_stock", label: "Item Stock" },
        { id: "tax", label: "Tax Rate" },
        { id: "weight", label: "Weight" },
        { id: "unit", label: "Unit" },
        { id: "hsn_code", label: "HSN Code" },
        { id: "point", label: "Points" },
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
        },
        {
            id: "Video",
            label: "Video",
            renderCell: (row) => {
                return row?.video ? (
                    <div className="active">Yes</div>
                ) : (
                    <div className="pending">No</div>
                );
            },
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
                        <IconButton color="primary" onClick={() => navigate(`${urls?.PRODUCTS_HANDLER}/${row?._id}`, { state: row })}>
                            <EditIcon />
                        </IconButton>
                    </Stack >
                );
            },
            sticky: true,
            width: 80
        },
    ];
    return { columns }
}
