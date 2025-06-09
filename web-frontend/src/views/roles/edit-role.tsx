import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditRoleForm } from '@/features/roles/edit/ui/edit-role-form';

export const EditRole = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editRole' />
            <EditRoleForm roleId={id} />
        </DefaultLayout>
    );
};
