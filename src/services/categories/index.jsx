import { api } from "../../AxiosInstants"

export const fetchCategories = async (signal, page, page_size, search) => {
    const { data } = await api.get(`/api/retrieve/maincategories`, { signal, params: { page, limit: page_size, search } })
    return data?.data
}

export const createCategory = async (values) => {
    const data = await api.post('/api/create/createCategory', values)
    return data
}

export const editCategory = async (values) => {
    const data = await api.post('/api/update/edit-Category', values)
    return data
}

//  Sub Category

export const fetchSubCategories = async (signal, id, page, page_size, search) => {
    const { data } = await api.get(`/api/retrieve/subCategoriesRetrieve?catId=${+id}`, { signal, params: { page, limit: page_size, search } })
    return data?.data
}

export const createSubCategory = async (values) => {
    const data = await api.post('/api/create/create-sub-category', values)
    return data
}

export const editSubCategory = async (values) => {
    const data = await api.post('/api/update/edit-category', values)
    return data
}

