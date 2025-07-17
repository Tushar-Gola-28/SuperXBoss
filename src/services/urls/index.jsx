import { api } from "../../AxiosInstants"

export const fetchUrlCategoryData = async (signal) => {
    const { data } = await api.get('/seo_service/v1/location/category/list', { signal })
    return data?.payload || []
}
export const fetchUrlCategoryLocationsData = async (signal, location_category) => {
    const { data } = await api.get('/seo_service/v1/location/get_location_list', { signal, params: { location_category } })
    return data?.payload || []
}
export const fetchUrlsMetaData = async (signal, page, page_size, search, location_category) => {
    const { data } = await api.get('/seo_service/v1/location/get_meta_location', { params: { page, page_size, search, location_category }, signal })
    return data
}
export const updateUrlsData = async (values) => {
    const data = await api.post('/seo_service/v1/location/add_meta_location', values)
    return data
}