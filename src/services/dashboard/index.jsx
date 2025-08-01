import { api } from "../../AxiosInstants"

export const fetchOverView = async (signal,) => {
    const { data } = await api.get(`/overview`, { signal, })
    return data?._payload || {}
}