import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreatePatientForm } from '@/features/patients/create/ui';

export const CreatePatient = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createPatient' />
            <CreatePatientForm />
        </DefaultLayout>
    );
};
