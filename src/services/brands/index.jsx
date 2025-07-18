import { api } from "../../AxiosInstants"

export const fetchBrands = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/api/retrieve/main-brands-retrieve`, { signal, params: { page, limit: page_size, search } })
    return data?.data
}

export const createBrand = async (values) => {
    const data = await api.post('/api/create/create-brand', values)
    return data
}

export const editBrand = async (values) => {
    const data = await api.post('/api/update/edit-brand', values)
    return data
}
