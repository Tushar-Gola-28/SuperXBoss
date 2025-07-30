import { api } from "../../AxiosInstants"

export const fetchCustomers = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/customer`, { signal, params: { page, limit: page_size, search } })
    return data
}

