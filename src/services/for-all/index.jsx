import { api } from "../../AxiosInstants"
import { notify } from "../../components"

export const fetchVehicleSegmentType = async (signal) => {
    const { data } = await api.get(`/vehicleSegmentType`, { signal })
    return data
}
export const fetchBrandType = async (signal) => {
    const { data } = await api.get(`/brandType`, { signal })
    return data
}

export const logout = async () => {

    try {
        const { data } = await api.post(`/logout`,)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}