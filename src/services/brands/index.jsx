import { api } from "../../AxiosInstants"
import { notify } from "../../components"
import { config } from "../../constants"

export const fetchBrands = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/brand`, { signal, params: { page, limit: page_size, search } })
    return data
}
export const fetchActiveBrands = async (signal) => {
    const { data } = await api.get(`/brand/active`, { signal, })
    return data
}

export const createBrand = async (values) => {
    try {
        const data = await api.post('/brand', values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const editBrand = async (values, id) => {
    try {
        const data = await api.put(`/brand/${id}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}