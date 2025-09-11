import https from "@/src/lib/http";

const categoryApiRequest = {
    sGetAllCategories: async (options) => https.get('/category/get-all', options),
    getAllCategories: async ({ params, signal }) => https.get('/api/category/get-all', {
        baseUrl: '',
        params,
        signal
    }),
    sCreateCategory: async (body, options) => https.post('/category/create', body, options),
    createCategory: async (body) => https.post('/api/category/create-category', body, {
        baseUrl: '',
    }),
    sFindCategoryById: async (options, id) => https.get(`/category/${id}`, options),
    findCategoryById: async ({ id }) => https.get(`/api/category/${id}`, {
        baseUrl: '',
    }),
    sUpdateCategoryById: async (options, id, body) => https.put(`/category/${id}`, body, options),
    updateCategoryById: async ({ id, body }) => https.put(`/api/category/${id}`, body, {
        baseUrl: '',
    }),
}

export default categoryApiRequest;