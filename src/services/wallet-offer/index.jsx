import { api } from "../../AxiosInstants"
import { notify } from "../../components";

export const fetchRecharge = async (signal, page, page_size, search, pagination, active) => {
    const { data } = await api.get(`/recharge`, { signal, params: { page, page_size, search, pagination, active } })
    return data
}

export const createRecharge = async (values) => {
    try {
        const data = await api.post('/recharge', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}

export const updateRecharge = async (values, id) => {
    try {
        const data = await api.put(`/recharge/${id}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
