import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
    authControllerStaffSignIn,
    setPassword,
} from "@/shared/api/generated";

import {
    StaffSignInBodyDto,
} from "@/shared/api/types";

import { registerUser } from "@/shared/api/generated"; // or wherever your register API call is

export function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: { full_name: string; email: string; phone: string }) =>
            registerUser(data),
    });
}



export function useSetPasswordMutation() {
    return useMutation({
        mutationFn: (data: { email: string; otp: string; password: string }) =>
            setPassword(data.email, data.otp, data.password),
    });
}

export function useSignInMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: StaffSignInBodyDto) => authControllerStaffSignIn(data),
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
            return response;
        },
    });
}
