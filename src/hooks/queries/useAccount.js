import { useQuery, useMutation } from "@tanstack/react-query"
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

export { useAccountProfile, useUpdateAccountProfile, useUpdateAccountPassword }
