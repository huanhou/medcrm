import { useQuery } from "@tanstack/react-query";
import { getRoles } from "./generated";

export function useGetRolesQuery() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            return await getRoles();
        },
        staleTime: 60 * 60 * 1000,
    });
}