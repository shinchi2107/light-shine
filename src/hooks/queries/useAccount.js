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

const useCreateAccount = () => {
    return useMutation({
        mutationFn: accountApiRequest.createAccount,
    })
}

export { useAccountProfile, useUpdateAccountProfile, useUpdateAccountPassword, useGetAllAccounts, useCreateAccount }
