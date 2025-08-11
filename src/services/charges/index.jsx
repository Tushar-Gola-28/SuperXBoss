import { api } from "../../AxiosInstants"
import { notify } from "../../components"


export const fetchCharges = async (signal,) => {
    const { data } = await api.get(`/charges`, { signal })
    return data?._payload || {}
}


export const editCharges = async (values, id) => {
    try {
        const data = await api.put(`/charges`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}