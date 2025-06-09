import { useMutation, useQuery } from "@tanstack/react-query";
import { editSpecialist, getSpecialistById } from "@/shared/api/generated";
import { BackendSpecialist, CreateSpecialistDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";

export function useEditSpecialistMutation(id: string) {
    return useMutation({
        mutationFn: async (data: CreateSpecialistDto) => {
            return await editSpecialist(id, data);
        },
    });
}

export function useGetSpecialistByIdQuery(id: string) {
    return useQuery({
        queryKey: ["specialist", id],
        queryFn: async () => {
            return await getSpecialistById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const specialists = queryClient.getQueryData<BackendSpecialist[]>([
                "specialists",
            ]);
            return specialists?.find((s) => s.id === id);
        },
    });
}
