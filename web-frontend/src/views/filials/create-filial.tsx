import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreateFilialForm } from '@/features/filials/create/ui/create-filial-form';

export const CreateFilial = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createFilial' />
            <CreateFilialForm />
        </DefaultLayout>
    );
};
