import { useMutation, useQuery } from "@tanstack/react-query";
import { editStaff, getStaffById } from "@/shared/api/generated";
import { BackendStaff, CreateStaffDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditStaffMutation(id: string) {
    ;
    return useMutation({
        mutationFn: async (data: CreateStaffDto) => {
            return await editStaff(id, data);
        },
    });
}

export function useGetStaffByIdQuery(id: string) {
    return useQuery({
        queryKey: ['staff', id],
        queryFn: async () => {
            return await getStaffById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const staff = queryClient.getQueryData<BackendStaff[]>(['staff']);
            return staff?.find((s) => s.id === id);
        },
    });
}