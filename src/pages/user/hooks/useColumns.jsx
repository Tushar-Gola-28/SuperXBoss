import { Avatar, IconButton, Stack } from '@mui/material';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BASE_URL } from '../../../../config-global';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router';
import { HoverAvatar } from '../../../components';
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
                        src={`${BASE_URL}/upload/categories/${row?.icon}`}
                        alt="_blank"
                    />

                );
            },
        },
        { id: "name", label: "Name" },
        { id: "Mobile", label: "Mobile" },
        { id: "Whatsapp", label: "Whatsapp" },
        { id: "Email", label: "Email" },
        { id: "Role", label: "Role" },
        {
            id: "user", label: "Create By", renderCell: (row) => {
                return <div>{row?.user?.name}</div>
            },
        },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
            },
        },
        {
            id: "status",
            label: "Status",
            renderCell: (row) => {
                return row?.status ? (
                    <div className="active">Active</div>
                ) : (
                    <div className="pending">Pending</div>
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
                        <IconButton color="primary" onClick={() => navigate(`sub-categories/${row?.id}`)}>
                            <PlaylistAddIcon />
                        </IconButton>
                    </Stack >
                );
            },
        },
    ];
    return { columns }
}
