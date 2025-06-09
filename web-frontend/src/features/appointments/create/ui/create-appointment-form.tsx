'use client';

import { AppointmentForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreateAppointmentMutation } from '../modal/appointment-create-api';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { AppointmentSchema } from '../../lib/appointment-schema';

export const CreateAppointmentForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateAppointmentMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: AppointmentSchema) => {
        const { appointmentDateTime, ...rest } = data;
        const formattedDateTime = new Date(appointmentDateTime).toISOString();
        create(
            { ...rest, appointmentDateTime: formattedDateTime },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['appointments'] });
                    toast.success(successNotifications.saved);
                    router.replace(ROUTES.appointments);
                },
                onError: () => {
                    toast.error(errorNotifications.notSaved);
                },
            }
        );
    };

    return (
        <AppointmentForm
            defaultValues={{
                patient: '',
                specialist: '',
                appointmentDateTime: '',
                status: '',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
