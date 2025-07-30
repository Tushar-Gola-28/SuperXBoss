import { FormControlLabel, Stack, Switch } from '@mui/material';
import dayjs from 'dayjs';
import { HoverAvatar } from '../../../components';
export default function useColumns() {
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        {
            id: "icon",
            label: "Profile Photo",
            renderCell: (row) => {
                return (
                    <HoverAvatar
                        src={row?.profile}
                        alt="_blank"
                    />

                );
            },
        },
        { id: "first_name", label: "First Name" },
        { id: "last_name", label: "Last Name" },
        { id: "email", label: "Email" },
        { id: "state", label: "State" },
        { id: "Gst No", label: "Gst No" },
        { id: "wallet_amount", label: "Wallet Amount" },
        { id: "business_type", label: "Business type" },
        { id: "business_name", label: "Business name", width: 150 },
        { id: "business_contact_no", label: "Business contact no", width: 150 },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
            },
            width: 150
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
                    <Stack direction="row" justifyContent="center" >
                        <FormControlLabel control={<Switch defaultChecked />} />
                    </Stack >
                );
            },
            sticky: true
        },
    ];
    return { columns }
}
