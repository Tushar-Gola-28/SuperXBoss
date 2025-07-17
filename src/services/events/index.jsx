import { api } from "../../AxiosInstants"

export const fetchEventData = async (signal) => {
    const { data } = await api.get('/seo_service/v1/get_events_list', { signal })
    return data
}
export const fetchMetaEventData = async (signal, page, page_size, search) => {
    const { data } = await api.get('/seo_service/v1/get_meta_events', { params: { page, page_size, search }, signal })
    return data
}
export const createEventMetaData = async (values) => {
    const data = await api.post('/seo_service/v1/add_meta_event', values)
    return data
}


