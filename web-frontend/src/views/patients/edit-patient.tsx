import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditPatientForm } from '@/features/patients/edit/ui/edit-patient-form';

export const EditPatient = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editPatient' />
            <EditPatientForm patientId={id} />
        </DefaultLayout>
    );
};
