import { useQuery } from "@tanstack/react-query";
import { getFilials } from "./generated";

export function useGetFilialsQuery() {
    return useQuery({
        queryKey: ["filials"],
        queryFn: async () => {
            return await getFilials();
        },
        staleTime: 60000,
    });
}