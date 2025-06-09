import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditPermissionForm } from '@/features/permissions/edit/ui/edit-permission-form';

export const EditPermission = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editPermission' />
            <EditPermissionForm permissionId={id} />
        </DefaultLayout>
    );
};
