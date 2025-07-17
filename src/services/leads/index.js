import { api } from "../../AxiosInstants"

export const fetchLeadData = async (signal, search) => {
    const { data } = await api.get('/seo_service/v1/leads/get', { signal, params: { search } })
    return data
}