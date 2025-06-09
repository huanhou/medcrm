import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreateServiceForm } from '@/features/services/create/ui';

export const CreateService = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createService' />
            <CreateServiceForm />
        </DefaultLayout>
    );
};
