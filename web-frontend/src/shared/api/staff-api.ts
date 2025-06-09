import { useQuery } from "@tanstack/react-query";
import { getListOfStaff } from "./generated";

export function useGetStaffQuery() {
    return useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            return await getListOfStaff();
        },
        staleTime: 60 * 60 * 1000,
    });
}
