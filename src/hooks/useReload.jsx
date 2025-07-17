import React, { useState } from 'react'

export default function useReload() {
    const [reload, setReload] = useState(false)
    const handleReload = () => {
        setReload((prev) => !prev)
    }
    return { handleReload, reload }
}
