import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchFaq = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/faq`, { signal, params: { page, limit: page_size, search } })
    return data
}

export const createFaq = async (values) => {
    try {
        const data = await api.post('/faq', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const updateFaq = async (values, faq) => {
    try {
        const data = await api.put(`/faq/${faq}`, values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}