import { api } from "../../AxiosInstants"
import { config } from "../../constants";

export const fetchCategories = async (signal, page, page_size, search, parent) => {
    const { data } = await api.get(`/category`, { signal, params: { page, limit: page_size, search, parent } })

    return data
}

export const createCategory = async (values) => {
    const data = await api.post('/category', values, config)
    return data
}

export const editCategory = async (values, id) => {
    const data = await api.put(`/category/${id}`, values, config)
    return data
}

export const createSubCategory = async (values) => {
    const data = await api.post('/api/create/create-sub-category', values)
    return data
}

export const editSubCategory = async (values) => {
    const data = await api.post('/api/update/edit-category', values)
    return data
}

