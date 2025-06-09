import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditFilialForm } from '@/features/filials/edit/ui/edit-filial-form';

export const EditFilial = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editFilial' />
            <EditFilialForm filialId={id} />
        </DefaultLayout>
    );
};
