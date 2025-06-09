import { useMutation, useQuery } from "@tanstack/react-query";
import { editService, getServiceById } from "@/shared/api/generated";
import { Service, EditServiceDto } from "@/shared/api/types";
import { queryClient } from "@/shared/api/query-client";


export function useGetServiceByIdQuery(id: string) {
    return useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            return await getServiceById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const services = queryClient.getQueryData<Service[]>(['services']);
            return services?.find((s) => s.id === id);
        },
    });
}

export function useEditServiceMutation(id: string) {
    return useMutation({
        mutationFn: async (data: EditServiceDto) => {
            return await editService(id, data);
        },
    });
}
