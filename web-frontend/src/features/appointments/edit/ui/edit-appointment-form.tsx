'use client';

import { useEditAppointmentMutation } from '../modal/appointment-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { useGetAppointmentByIdQuery } from '../../model/appointment-api';
import { Loader } from '@/shared/ui';
import { Appointment } from '@/shared/api/types';
import { AppointmentForm } from '../../ui/shared-form';
import { AppointmentSchema } from '../../lib/appointment-schema';

export const EditAppointmentForm = ({ appointmentId }: { appointmentId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: appointmentToEdit, isLoading } = useGetAppointmentByIdQuery(appointmentId);

    const { mutate: edit, isPending, error } = useEditAppointmentMutation(appointmentId);

    const onSubmit = (data: AppointmentSchema) => {
        const { date_time, ...rest } = data;
        const formattedDateTime = new Date(date_time).toISOString();

        edit(
            { ...rest, date_time: formattedDateTime },
            {
                onSuccess: () => {
                    const currentList = queryClient.getQueryData<Appointment[]>(['appointments']) || [];
                    const updatedList = currentList.map((p) => (p.id === appointmentId ? { ...p, ...data } : p));
                    queryClient.setQueryData(['appointments'], updatedList);
                    queryClient.invalidateQueries({ queryKey: ['appointment', appointmentId] });
                    toast.success(successNotifications.saved);
                    router.replace(ROUTES.appointments);
                },
                onError: () => {
                    toast.error(errorNotifications.notSaved);
                    console.error(error);
                },
            }
        );
    };

    if (isLoading) {
        return <Loader />;
    }

    if (appointmentId) {
        return (
            <AppointmentForm
                defaultValues={{
                    patient_id: appointmentToEdit?.patient_id,
                    specialist_id: appointmentToEdit?.specialist_id,
                    date_time: appointmentToEdit?.date_time,
                    comment: appointmentToEdit?.comment,
                    status: appointmentToEdit?.status,
                }}
                onSubmit={onSubmit}
                isLoading={isPending}
                buttonText={buttons.save}
            />
        );
    }
};
