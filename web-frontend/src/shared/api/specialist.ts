import { useQuery } from "@tanstack/react-query";
import { getSpecialists } from "./generated";

export function useGetSpecialistsQuery() {
    return useQuery({
        queryKey: ["specialists"],
        queryFn: async () => {
            return await getSpecialists();
        },
        staleTime: 60 * 60 * 1000,
    });
}
