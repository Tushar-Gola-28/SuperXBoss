import axios from "axios"
import { api } from "../../AxiosInstants"

export const fetchEventGroupData = async (signal) => {
    const { data } = await api.get('/seo_service/v1/get_event_group_list', { signal })
    return data?.payload
}
export const fetchMetaEventGroupData = async (signal, page, page_size, search) => {
    const { data } = await api.get('/seo_service/v1/get_meta_event_groups', { params: { page, page_size, search }, signal })
    return data
}
export const postEventGroupData = async (values) => {
    const data = await api.post('/seo_service/v1/add_meta_event_groups', values)
    return data
}

export const getLocationAreaNames = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_CUSTOMER_SIDE_BASE_URL}/service/events_service/v1/no_auth/regions/list`, { headers: { Authorization: undefined } });
        return res.data?._payload;
    } catch (error) {
        toast?.error(error.message || error || "Some thing went wrong");
        return []
    }
};