import React, { useState } from 'react'

export function useEditData() {
    const [editData, setEditData] = useState(null)
    const handleEditData = (data) => {
        setEditData(data)
    }
    return { editData, handleEditData, setEditData }
}
