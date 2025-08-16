import { api } from "../../AxiosInstants"

export const fetchQueries = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/in-query`, { signal, params: { page, page_size, search } })
    return data || {}
}