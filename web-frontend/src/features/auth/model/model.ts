import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authControllerStaffSignIn, setPassword, verifyOtp } from "@/shared/api/generated";

import { StaffSignInBodyDto } from "@/shared/api/types";

import { registerUser } from "@/shared/api/generated"; // or wherever your register API call is

// Updated mutation for registration
export function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: { full_name: string; email: string; phone: string }) =>
            registerUser(data),
    });
}

// Updated mutation for OTP verification
export function useVerifyOtpMutation() {
    return useMutation({
        mutationFn: (data: { email: string; otp: string }) =>
            verifyOtp(data), // Call to verify OTP
    });
}

// Updated mutation for setting the password
export function useSetPasswordMutation() {
    return useMutation({
        mutationFn: (data: { email: string; otp: string; password: string }) =>
            setPassword(data.email, data.otp, data.password),
    });
}

// Updated mutation for SignIn
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
