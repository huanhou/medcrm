import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreateAppointmentForm } from '@/features/appointments/create/ui/create-appointment-form';

export const CreateAppointment = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createAppointment' />
            <CreateAppointmentForm />
        </DefaultLayout>
    );
};
