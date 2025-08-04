import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchCustomers = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/customer`, { signal, params: { page, limit: page_size, search } })
    return data
}



export const updateCustomerStatus = async (values) => {
    try {
        const data = await api.put(`/customer/status/${values.customer}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}