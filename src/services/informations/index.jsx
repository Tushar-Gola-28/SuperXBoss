import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchRatingInfo = async (signal) => {
    const { data } = await api.get(`/rating`, { signal, })
    return data
}

export const updateRatingInfo = async (values, _id) => {
    try {
        const data = await api.put(`/rating/${_id}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}