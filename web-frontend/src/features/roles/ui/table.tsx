'use client';

import { ROUTES } from '@/shared/constants/routs';
import { useRolefTable } from '../model/use-role-table';
import { useDeleteRoleMutation } from '../model/role-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { tableLogic } = useRolefTable();
    const deleteRoleMutation = useDeleteRoleMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteRoleMutation}
            routeCreate={ROUTES.createRole}
            routeEdit={ROUTES.rolesEdit}
            queryKey='roles'
            entityType='roles'
            createPermission='CREATE_ROLE'
            editPermission='UPDATE_ROLE'
            deletePermission='DELETE_ROLE'
        />
    );
};
