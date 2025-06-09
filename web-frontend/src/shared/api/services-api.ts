import { useQuery } from "@tanstack/react-query";
import { getDoctors, getServices } from "./generated";

export function useGetServicesQuery() {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            return await getServices();
        },
        staleTime: 60 * 60 * 1000,
    });
}

export function useGetDoctorsQuery() {
    return useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            return await getDoctors();
        },
        staleTime: 60 * 60 * 1000,
    });
}
