import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditAppointmentForm } from '@/features/appointments/edit/ui/edit-appointment-form';

export const EditAppointment = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editAppointment' />
            <EditAppointmentForm appointmentId={id} />
        </DefaultLayout>
    );
};
