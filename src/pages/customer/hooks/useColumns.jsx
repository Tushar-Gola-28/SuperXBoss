import { FormControlLabel, IconButton, Stack, Switch } from '@mui/material';
import dayjs from 'dayjs';
import { HoverAvatar, notify } from '../../../components';
import AddIcon from '@mui/icons-material/Add';
export default function useColumns(updateMutation, refetch, handleOpenModal, handleEditData) {
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        {
            id: "icon",
            label: "Profile ",
            renderCell: (row) => {
                return (
                    <HoverAvatar
                        src={row?.profile}
                        alt="_blank"
                    />

                );
            },
            width: 80
        },
        { id: "name", label: "Name" },
        { id: "email", label: "Email" },
        { id: "type", label: "Customer Type" },
        { id: "Gst No", label: "Gst No" },
        { id: "wallet_amount", label: "Wallet Amount" },
        { id: "points", label: "Points" },
        { id: "business_type", label: "Business type" },
        { id: "business_name", label: "Business name", width: 150 },
        { id: "business_contact_no", label: "Business contact no", width: 150 },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
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
                    <div className="pending">Pending</div>
                );
            },
        },
        {
            id: "Add Wallet Amount",
            label: "Add Wallet Amount",
            renderCell: (row) => {
                return (
                    <Stack direction="row" justifyContent="center" >

                        <IconButton color='primary' onClick={() => { handleEditData(row); handleOpenModal() }}>
                            <AddIcon />
                        </IconButton>
                    </Stack >
                );
            },
        },
        {
            id: "action",
            label: "Action",
            renderCell: (row) => {
                return (
                    <Stack direction="row" justifyContent="center" >
                        <FormControlLabel control={<Switch checked={row.status} onChange={(e) => {
                            updateMutation.mutate({ customer: row._id, status: e.target.checked }, {
                                onSuccess: (res) => {
                                    console.log(res);
                                    refetch()
                                    notify("Customer Status Successfully.", "success")

                                }
                            })
                        }} />} />
                    </Stack >
                );
            },
            sticky: true
        },
    ];
    return { columns }
}
