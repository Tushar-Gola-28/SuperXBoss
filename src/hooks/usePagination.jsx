import { useState } from 'react'

export function usePagination() {
    const [page, setPage] = useState(0)
    const [page_size, setPage_size] = useState(15)
    const [total_records, setTotal_records] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const handlePagination = (data) => {
        setTotalPages(data?.totalPages ? data?.totalPages : 1)
        setTotal_records(data?.total_records ? data?.total_records : 1)
    }

    const handlePageSize = (event) => {        
        setPage(0);
        setPage_size(event.target.value);
    };
    return { page, setPage, setPage_size, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePagination, handlePageSize }
}
