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
export const createVehicleAssign = async (values) => {
    try {
        const data = await api.post('/product/vehicle-assign', values)
        return data
    } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message)
        }

    }
}
export const getVehicleAssign = async (signal, product_id) => {
    try {
        const data = await api.get(`/product/vehicle-assign/${product_id}`, { signal })
        return data?.data
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
export const fetchProducts = async (signal, pagination = true, page, page_size, search, active, brand) => {
    const { data } = await api.get(`/product`, { signal, params: { pagination, page, page_size, search, active, brand } })
    return data
}
export const fetchProductsById = async (signal, product) => {
    const { data } = await api.get(`/product/${product}`, { signal, })
    return data
}