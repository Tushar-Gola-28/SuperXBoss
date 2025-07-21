import { api } from "../../AxiosInstants"
import { notify } from "../../components"
import { config } from "../../constants"

export const fetchUsers = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/users`, { signal, params: { page, limit: page_size, search } })
    return data
}
export const createUser = async (values) => {
    try {
        const data = await api.post('/user', values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}
export const updateUser = async (values, user) => {
    try {
        const data = await api.put(`/user/${user}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }
    }
}