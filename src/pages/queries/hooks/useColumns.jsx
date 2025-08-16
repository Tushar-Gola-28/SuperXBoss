import dayjs from 'dayjs';
export default function useColumns() {
    const columns = [
        {
            id: "S No", label: "S No.", renderCell: (row, index) => {
                return index + 1
            },
        },
        {
            id: "name",
            label: "Name",
            width: 150,
            renderCell: (row, index) => {
                return row?.name
            },
        },
        {
            id: "mobile",
            label: "Mobile Number",
            renderCell: (row, index) => {
                return row?.mobile
            },
        },
        {
            id: "Message", label: "Message",
            renderCell: (row, index) => {
                return row?.name
            },
            width: 500,
        },
        {
            id: "createdAt",
            label: "CreateAt",
            renderCell: (row) => {
                return dayjs(row?.createdAt).format("DD MMMM YYYY, h:mm A");
            },
            width: 200
        },
    ];
    return { columns }
}
