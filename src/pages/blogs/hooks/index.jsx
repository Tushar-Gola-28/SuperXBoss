import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import TruncateText from '../../../components/ui/TruncateText';
import { useNavigate } from 'react-router';
export default function useColums() {
    const navigate = useNavigate()
    const getStatusDotStyle = {
        height: "6px",
        width: "6px",
        borderRadius: "50%",
        display: "inline-block",
    };
    const getStatusTextWithColor = (status) => {
        let text = "";
        let color = "";

        switch (status) {
            case true:
                text = "Active";
                color = "#4CAF50";
                break;
            case false:
                text = "In Active";
                color = "#FF2626";
                break;
        }

        return (
            <div>
                <span style={{ ...getStatusDotStyle, backgroundColor: color }}></span>
                <span style={{ marginLeft: "6px", color }}>{text}</span>
            </div>
        );
    };
    const blogsMeta = [
        {
            id: "SI No",
            label: "SI No",
            renderCell: (_, index) => {
                return index + 1;
            },


        },
        {
            id: "name",
            label: "Blog Name",
            renderCell: (row) => {
                return row?.venue_data?.title
            },

        },
        {
            id: "title",
            label: "Blog Title",
            width: 300
        },
        {
            id: "Event Link",
            label: "Link",
            renderCell: (row) => {
                return <TruncateText copyText={`${import.meta.env.VITE_FRONT_END_BASE_URL}/blogs/${row?.venue_data?.handle}`} />
            },
            width: 250

        },
        {
            id: "Total Keywords",
            label: "Total Keywords",
            renderCell: (row) => {
                return row?.key_word?.length
            },
        },
        {
            id: "Status",
            label: "Status",
            width: 200,
            renderCell: (row) => {
                return getStatusTextWithColor(row?.venue_data?.status);
            },
        },
        {
            id: "Created at",
            label: "Created at",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format('DD/MM/YYYY hh:mm A')
            },
            width: 200

        },
        {
            id: "Action",
            label: "Action",
            sticky: true,
            renderCell: (row) => {
                return (
                    <IconButton color="primary" onClick={() => navigate('meta/', { state: row })}>
                        <EditIcon />
                    </IconButton>
                )
            },
            width: 100

        },
    ]
    return { blogsMeta }
}
