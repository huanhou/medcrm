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
        mutationFn: async (ids: string[]) => {
            // ids will be an array of patient IDs you want to delete
            console.log('Deleting patients with IDs:', ids);  // Log the IDs being deleted
            return await deletePatient(ids);  // Pass the array of IDs to deletePatient
        },
        onSuccess: () => {
            // Invalidate the query for the patients list to refresh the data
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
        onError: (error) => {
            // Handle error in case the delete request fails
            console.error("Error deleting patient(s):", error);
        },
    });
}
