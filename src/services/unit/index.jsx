import { api } from "../../AxiosInstants"
import { notify } from "../../components";
import { config } from "../../constants";

export const fetchUnits = async (signal, page, page_size, search, pagination, active) => {
    const { data } = await api.get(`/unit`, { signal, params: { page, page_size, search, pagination, active } })
    return data
}

export const createUnit = async (values) => {
    try {
        const data = await api.post('/unit', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}

export const updateUnit = async (values, id) => {
    try {
        const data = await api.put(`/unit/${id}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
