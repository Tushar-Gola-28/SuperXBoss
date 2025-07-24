import { api } from "../../AxiosInstants";
import { notify } from "../../components";
import { config } from "../../constants";

export const createBanner = async (values) => {
    try {
        const data = await api.post('/banner', values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
export const updateBanner = async (values, banner) => {
    try {
        const data = await api.put(`/banner/${banner}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}

export const fetchBanner = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/banner`, { signal, params: { page, limit: page_size, search } })
    return data
}