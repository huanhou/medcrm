import { useQuery, useMutation } from '@tanstack/react-query';
import { getAppointments, deleteAppointment, getAppointmentById } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
import { Appointment } from '@/shared/api/types';

export function useGetAppointmentsQuery() {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            return await getAppointments();
        },
        staleTime: 60 * 60 * 1000,
    });
}

export function useGetAppointmentByIdQuery(id: string) {
    return useQuery({
        queryKey: ['appointment', id],
        queryFn: async () => {
            return await getAppointmentById(id);
        },
        staleTime: 60 * 60 * 1000,
        enabled: !!id,
        initialData: () => {
            const appointments = queryClient.getQueryData<Appointment[]>(['appointments']);
            return appointments?.find((p) => p.id === id);
        },
    });
}

export function useDeleteAppointmentMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {
            return await deleteAppointment(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });
}
