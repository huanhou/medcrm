'use client';

import { ROUTES } from '@/shared/constants/routs';
import { usePermissionTable } from '../model/use-permission-table';
import { useDeletePermissionMutation } from '../model/permission-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { tableLogic } = usePermissionTable();
    const deletePermissionMutation = useDeletePermissionMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deletePermissionMutation}
            routeCreate={ROUTES.createPermission}
            routeEdit={ROUTES.editPermission}
            queryKey='permissions'
            entityType='permissions'
            createPermission='CREATE_PERMISSION'
            editPermission='UPDATE_PERMISSION'
            deletePermission='DELETE_PERMISSION'
        />
    );
};
