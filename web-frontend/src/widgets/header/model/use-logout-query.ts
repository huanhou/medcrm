import { authControllerSignOut } from "@/shared/api/generated";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/constants/routs";




export function useLogoutMutation() {
    return useMutation({
        mutationFn: authControllerSignOut,
        onSuccess: () => {
            queryClient.clear();

            localStorage.clear();
            sessionStorage.clear();

            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=none`;
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=none`;
            }

            window.location.href = ROUTES.signIn;
        },
    });
}