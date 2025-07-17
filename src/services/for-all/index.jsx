import { api } from "../../AxiosInstants"

export const fetchVehicleSegmentType = async (signal) => {
    const { data } = await api.get(`/api/retrieve/vehicle-segment-type`, { signal, })
    return data?.data
}