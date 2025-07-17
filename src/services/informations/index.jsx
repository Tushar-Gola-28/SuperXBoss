import { api } from "../../AxiosInstants"

export const fetchRatingInfo = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/api/retrieve/rating-retrieve`, { signal, })
    return data?.data
}