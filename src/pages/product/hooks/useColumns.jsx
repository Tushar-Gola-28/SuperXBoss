import { IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import { HoverAvatar } from '../../../components';
import { urls } from '../../../routes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomMenus from '../../../components/ui/CustomMenus';
import useMenu from '../../../hooks/useMenu';
import { useState } from 'react';
export default function useColumns() {
    const navigate = useNavigate()
    const { open, anchorEl, handleClick, handleClose } = useMenu()
    const [check, setCheck] = useState("")
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
        { id: "discount_customer_price", label: "Discounted Customer Price" },
        { id: "discount_b2b_price", label: "Discounted B2B Price" },
        {
            id: "any_discount", label: "Any Discount",
            renderCell: (row) => {
                return row?.any_discount || 0
            },
        },
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
        {
            id: "unit", label: "Unit",
            renderCell: (row) => {
                return row?.unit?.pc ? `${row?.unit?.name} ${row?.unit?.set} (${row?.unit?.pc})` : `${row?.unit?.name} ${row?.unit?.set}`
            },
        },
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
            width: 250
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
                        <IconButton color="primary" onClick={(e) => { handleClick(e); setCheck(row?._id) }}>
                            <MoreVertIcon />
                        </IconButton>
                        {row?._id == check && <CustomMenus
                            open={open}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            menuList={[
                                {
                                    label: "Assign", onClick: () => navigate(`${urls?.ASSIGN_VEHICLE}/${row?._id}`)
                                }
                            ]}
                        />}
                    </Stack >
                );
            },
            sticky: true,
            width: 120
        },
    ];
    return { columns }
}
