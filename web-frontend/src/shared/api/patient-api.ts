import { useQuery } from "@tanstack/react-query";
import { getPatients } from "./generated";

export function useGetPatientsQuery() {
    return useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            return await getPatients();
        },
        staleTime: 60 * 60 * 1000,
    });
}