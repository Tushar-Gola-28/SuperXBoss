import { api } from "../../AxiosInstants";
import { notify } from "../../components";
import { config } from "../../constants";

export const fetchDocuments = async (signal,) => {
    const { data } = await api.get(`/documents`, { signal })
    return data
}

export const uploadDocumentsFiles = async (values) => {
    try {
        const data = await api.post(`/documents/upload-single`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
