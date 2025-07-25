import { api } from "../../AxiosInstants";
import { notify } from "../../components";
import { config } from "../../constants";

export const createProduct = async (values) => {
    try {
        const data = await api.post('/product', values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const updateProduct = async (values, product) => {
    try {
        const data = await api.put(`/product/${product}`, values, config)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const fetchProducts = async (signal, pagination = true, page, page_size, search, active) => {
    const { data } = await api.get(`/product`, { signal, params: { pagination, page, page_size, search, active } })
    return data
}
export const fetchProductsById = async (signal, product) => {
    const { data } = await api.get(`/product/${product}`, { signal, })
    return data
}