import { api } from "../../AxiosInstants"


export const fetchVenueData = async (signal) => {
    const { data } = await api.get('/seo_service/v1/get_venues_list', { signal })
    return data?._payload || []
}
export const fetchVenueMetaData = async (values) => {
    const data = await api.post('/seo_service/v1/add_meta_venue', values)
    return data
}
export const fetchMetaVenueData = async (signal, page, page_size, search) => {
    const { data } = await api.get('/seo_service/v1/get_meta_venue', { params: { page, page_size, search }, signal })
    return data
}