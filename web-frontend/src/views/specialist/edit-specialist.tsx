import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditSpecialistForm } from '@/features/specialist/edit/ui/edit-specialist-form';

export const EditSpecialist = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editSpecialist' />
            <EditSpecialistForm specialistId={id} />
        </DefaultLayout>
    );
};
