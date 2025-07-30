import { Avatar, IconButton, Stack } from '@mui/material';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { BASE_URL } from '../../../../config-global';
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
            label: "Banner Image",
            renderCell: (row) => {
                return (
                    <HoverAvatar
                        src={row?.image}
                        alt="_blank"
                    />

                );
            },
        },
        {
            id: "name", label: "Product Name",
            renderCell: (row) => {
                return <div>{row?.product?.name}</div>
            },
        },
        {
            id: "position", label: "Banner Position",
            renderCell: (row) => {
                return <div>{row?.position == "top" ? "Top Section" : row?.position == "mid" ? "Mid Section" : row?.position == "bottom" ? "Bottom Section" : ""}</div>
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
                        <IconButton color="primary" onClick={() => { navigate(`${urls.BANNER_HANDLER}/${row?._id}`, { state: row }) }}>
                            <EditIcon />
                        </IconButton>
                    </Stack >
                );
            },
        },
    ];
    return { columns }
}
