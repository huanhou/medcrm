import { useQuery, useMutation } from '@tanstack/react-query';
import { deletePatient, getPatientById } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
import { Patient } from '@/shared/api/types';

export function useGetPatientByIdQuery(id: string) {
    return useQuery({
        queryKey: ['patient', id],
        queryFn: async () => {
            return await getPatientById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const patients = queryClient.getQueryData<Patient[]>(['patients']);
            return patients?.find((p) => p.id === id);
        },
    });
}

export function useDeletePatientMutation() {
    return useMutation({
        mutationFn: async (id: string) => {
            return await deletePatient(id); // Ensure you're deleting one patient at a time
        },
        onSuccess: () => {
            // Invalidate the patients query after a successful deletion
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
        onError: (error) => {
            // Optionally handle error (you can show an error message here)
            console.error("Error deleting patient:", error);
        },
    });
}

