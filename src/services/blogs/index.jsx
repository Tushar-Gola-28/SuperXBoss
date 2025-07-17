import { api } from "../../AxiosInstants"

export const fetchMetaBlogsData = async (signal, page, page_size, search) => {
    const { data } = await api.get('/seo_service/v1/blogs/get_meta_blogs', { params: { page, page_size, search }, signal })
    return data
}
export const fetchBlogsData = async (signal) => {
    const { data } = await api.get('/seo_service/v1/blogs/get_blogs_list', { signal })
    return data
}
export const createBlogsMetaData = async (values) => {
    const data = await api.post('/seo_service/v1/blogs/create', values)
    return data
}
export const createBlogsEventMetaData = async (values) => {
    const data = await api.post('/seo_service/v1/blogs/sponsered_events/add', values)
    return data
}
export const getEventsBlogsMetaData = async (signal, value) => {
    const data = await api.get('/seo_service/v1/blogs/sponsered_events/list', { params: { blog_handle: value }, signal })
    return data.data || []
}
