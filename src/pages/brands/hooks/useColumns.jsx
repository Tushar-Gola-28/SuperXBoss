import { IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import { HoverAvatar } from '../../../components';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import { urls } from '../../../routes/urls';
export default function useColumns(handleEditData, handleOpenModal, handleOpenModal1) {
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
                        src={row?.logo}
                        alt="_blank"
                    />

                );
            },
            width: 80
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
            width: 200
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
                        <IconButton color="primary" onClick={() => {
                            handleEditData(row);
                            if (row?.brand_type?.name == "Vehicle") {
                                handleOpenModal()
                            } else {
                                handleOpenModal1()

                            }
                        }}>
                            <EditIcon />
                        </IconButton>
                        {row?.brand_type?.name == "Vehicle" && <IconButton color="primary" onClick={() => navigate(`${urls.VEHICLE}/${row?._id}`)} >
                            <ElectricScooterIcon />
                        </IconButton>}
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
            width: 80
        },
        { id: "name", label: "Name" },
        { id: "start_year", label: "Start year" },
        {
            id: "end_year", label: "End year",
            renderCell: (row) => {
                return row?.end_year || "-"
            },
        },

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
                        <IconButton color="primary" onClick={() => { handleEditData(row); handleOpenModal() }}>
                            <EditIcon />
                        </IconButton>
                    </Stack >
                );
            },
            sticky: true,
            width: 100
        },
    ];
    return { columns, columns2 }
}
