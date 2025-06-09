import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditServiceForm } from '@/features/services/edit/ui/edit-services-form';

export const EditService = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editService' />
            <EditServiceForm serviceId={id} />
        </DefaultLayout>
    );
};
