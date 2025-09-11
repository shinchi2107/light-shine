import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query"
import categoryApiRequest from "@/src/api/request/category"

const useGetAllCategories = ({ page = 1, limit = 10, search = "" }) => {
    const params = { page, limit, search };
    return useQuery({
        queryKey: ["categories", page, limit, search],
        queryFn: ({ signal }) => categoryApiRequest.getAllCategories({ params, signal }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    })
}

const useFindCategoryById = ({ id }) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => categoryApiRequest.findCategoryById({ id }),
        staleTime: 1000 * 60 * 10, // cache 10 minutes
        enabled: Boolean(id),
    })
}

const useCreateCategory = () => {
    return useMutation({
        mutationFn: categoryApiRequest.createCategory,
    })
}

const useUpdateCategoryById = ({ id }) => {
    return useMutation({
        mutationFn:(data) => categoryApiRequest.updateCategoryById({ id, body: data }),
    })
}

export { 
    useGetAllCategories, 
    useFindCategoryById,
    useCreateCategory,
    useUpdateCategoryById
}
