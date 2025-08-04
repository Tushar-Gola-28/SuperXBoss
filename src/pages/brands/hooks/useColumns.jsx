import { Avatar, IconButton, Stack } from '@mui/material';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BASE_URL } from '../../../../config-global';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router';
import { HoverAvatar } from '../../../components';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import { urls } from '../../../routes/urls';
export default function useColumns(handleEditData, handleOpenModal) {
    const navigate = useNavigate()
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        { id: "name", label: "Name" },
        {
            id: "Type", label: "Type", renderCell: (row) => {
                return row?.brand_type?.name || "-"
            },
        },
        // {
        //     id: "brand_segment", label: "Brand Segment",
        //     renderCell: (row) => {
        //         return row?.brand_segment?.length >= 2 ? `${row?.brand_segment?.[0]?.name} +${row?.brand_segment?.length - 1} others` : row?.brand_segment?.[0]?.name
        //     },
        // },
        {
            id: "Total Categories", label: "Total Categories",
            renderCell: (row) => {
                return row?.categories?.length || 0
            },
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
        },
        {
            id: "brand_day",
            label: "Brand Day",
            renderCell: (row) => {
                return row?.brand_day ? (
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
                        <IconButton color="primary" onClick={() => { handleEditData(row); handleOpenModal() }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => navigate(`${urls.VEHICLE}/${row?._id}`)} disabled={row?.brand_type?.name != "Vehicle"} >
                            <ElectricScooterIcon />
                        </IconButton>
                    </Stack >
                );
            },
            sticky: true
        },
    ];
    const columns2 = [
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
                        src={row?.picture}
                        alt="_blank"
                    />

                );
            },
        },
        { id: "name", label: "Name" },
        { id: "start_year", label: "Start year" },
        { id: "end_year", label: "End year" },

        {
            id: "Brand Name", label: "Brand Name", renderCell: (row) => {
                return row?.brand?.name || "-"
            },
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
                        <IconButton color="primary" onClick={() => { handleEditData(row); handleOpenModal() }}>
                            <EditIcon />
                        </IconButton>
                    </Stack >
                );
            },
            sticky: true
        },
    ];
    return { columns, columns2 }
}
