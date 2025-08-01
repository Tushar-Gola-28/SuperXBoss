import { api } from "../../AxiosInstants"

export const fetchOrders = async (signal, page, page_size, search, filter) => {
    const { orderNo, orderId } = filter || {}
    const { data } = await api.get(`/order`, { signal, params: { page, page_size, search, orderId, orderNo } })
    return data || {}
}