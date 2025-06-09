import { useQuery, useMutation } from '@tanstack/react-query';
import { getFilials, deleteFilial, getFilialById } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
import { Filial } from '@/shared/api/types';

export function useGetFilialsQuery() {
    return useQuery({
        queryKey: ['filials'],
        queryFn: async () => {
            return await getFilials();
        },
        staleTime: 60 * 60 * 1000,
    });
}

export function useGetFilialByIdQuery(id: string) {
    return useQuery({
        queryKey: ['filial', id],
        queryFn: async () => {
            return await getFilialById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const filials = queryClient.getQueryData<Filial[]>(['filials']);
            return filials?.find((f) => f.id === id);
        },
    });
}

export function useDeleteFilialMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {
            console.log('Deleting filials with IDs:', ids);  // Log the IDs here
            return await deleteFilial(ids);  // Pass the array of IDs to deleteFilial
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['filials'] });
        },
    });
}


