import { api } from "../../AxiosInstants"
import { notify } from "../../components"
import { config } from "../../constants"

export const fetchSegments = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/vehicleSegmentType`, { signal, params: { page, page_size, search } })
    return data
}
export const fetchSegmentsAll = async (signal, status = true) => {
    const { data } = await api.get(`/vehicleSegmentType/without-page`, { signal, params: { status } })
    return data
}

export const createSegment = async (values) => {
    try {
        const data = await api.post(`/vehicleSegmentType`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
export const updateSegment = async (values, _id) => {
    try {
        const data = await api.put(`/vehicleSegmentType/${_id}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}