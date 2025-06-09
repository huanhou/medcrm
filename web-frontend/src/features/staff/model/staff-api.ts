import { useMutation, useQuery } from "@tanstack/react-query";
import {
    deleteStaff,
    getListOfStaff,
} from "@/shared/api/generated";

export function useGetStaffQuery() {
    return useQuery({
        queryKey: ["staffList"],
        queryFn: getListOfStaff,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}

export function useDeleteStaffMutation() {
    return useMutation({
        mutationFn: async (ids: number[]) => {
            if (ids.length === 0) {
                throw new Error('Cannot delete: no staff selected.');
            }

            return await deleteStaff(ids);  // Pass the correct integer array
        },
    });
}
