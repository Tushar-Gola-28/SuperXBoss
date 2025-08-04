import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchOrders = async (signal, page, page_size, search, filter) => {
    const { orderNo, orderId, status } = filter || {}
    const { data } = await api.get(`/order`, { signal, params: { page, page_size, search, orderId, orderNo, status } })
    return data || {}
}
export const updateOrder = async (values) => {
    try {
        const data = await api.put('/order', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}