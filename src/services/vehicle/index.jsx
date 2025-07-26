import { api } from "../../AxiosInstants"
import { notify } from "../../components"
import { config } from "../../constants"

export const fetchVehicles = async (signal, page, page_size, search, brand_id) => {
    const { data } = await api.get(`/vehicle/${brand_id}`, { signal, params: { page, page_size, search } })
    return data
}

export const createVehicle = async (values, brand_id) => {
    try {
        const data = await api.post(`/vehicle/${brand_id}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const updateVehicle = async (values, vehicle_id, brand_id) => {
    try {
        const data = await api.put(`/vehicle/${vehicle_id}/${brand_id}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}