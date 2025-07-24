import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchCoupon = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/coupon`, { signal, params: { page, limit: page_size, search } })
    return data
}

export const createCoupon = async (values) => {
    try {
        const data = await api.post('/coupon', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
export const updateCoupon = async (values, coupon) => {
    try {
        const data = await api.put(`/coupon/${coupon}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}