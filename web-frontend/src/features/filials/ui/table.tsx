'use client';

import { ROUTES } from '@/shared/constants/routs';
import { useFilialsTable } from '../model/use-filial-table';
import { useDeleteFilialMutation } from '../model/filial-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { tableLogic } = useFilialsTable();
    const deleteFilialMutation = useDeleteFilialMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteFilialMutation}
            routeCreate={ROUTES.createFilial}
            routeEdit={ROUTES.editFilial}
            queryKey='filials'
            entityType='filials'
            createPermission='CREATE_FILIAL'
            editPermission='UPDATE_FILIAL'
            deletePermission='DELETE_FILIAL'
        />
    );
};
