import { useMutation } from "@tanstack/react-query";
import authApiRequest from "../api/request/auth";

const useLoginMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.login,
    })
}

const useRegisterMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.register,
    })
}

export { useLoginMutation, useRegisterMutation };