import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query"
import accountApiRequest from "@/src/api/request/account"
const useAccountProfile = () => {
    return useQuery({
        queryKey: ["account-profile"],
        queryFn: accountApiRequest.getAccountProfile,
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    })
}

const useUpdateAccountProfile = () => {
    return useMutation({
        mutationFn: accountApiRequest.updateAccountProfile,
    })
}

const useUpdateAccountPassword = () => {
    return useMutation({
        mutationFn: accountApiRequest.updateAccountPassword,
    })
}

const useGetAllAccounts = ({ page = 1, limit = 10, search = "" }) => {
    const params = { page, limit, search };
    return useQuery({
        queryKey: ["accounts", page, limit, search],
        queryFn: ({ signal }) => accountApiRequest.getAllAccounts({ params, signal }),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    })
}

const useFindAccountById = ({ id }) => {
    return useQuery({
        queryKey: ["account", id],
        queryFn: () => accountApiRequest.findAccountById({ id }),
        staleTime: 1000 * 60 * 10, // cache 10 minutes
        enabled: Boolean(id),
    })
}

const useCreateAccount = () => {
    return useMutation({
        mutationFn: accountApiRequest.createAccount,
    })
}

const useUpdateAccountById = ({ id }) => {
    return useMutation({
        mutationFn:(data) => accountApiRequest.updateAccountById({ id, body: data }),
    })
}

export { 
    useAccountProfile, 
    useUpdateAccountProfile, 
    useUpdateAccountPassword, 
    useGetAllAccounts, 
    useCreateAccount,
    useFindAccountById,
    useUpdateAccountById
}
