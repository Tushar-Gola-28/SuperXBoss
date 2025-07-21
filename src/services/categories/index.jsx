import { api } from "../../AxiosInstants"
import { notify } from "../../components";
import { config } from "../../constants";

export const fetchCategories = async (signal, page, page_size, search, parent) => {
    const { data } = await api.get(`/category`, { signal, params: { page, limit: page_size, search, parent } })
    return data
}

export const createCategory = async (values) => {
    try {
        const data = await api.post('/category', values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}

export const editCategory = async (values, id) => {
    try {
        const data = await api.put(`/category/${id}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
