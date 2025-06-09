'use client';

import { GenericTable, Loader } from '@/shared/ui';
import { ROUTES } from '@/shared/constants/routs';
import { useSpecialistTable } from '../model/use-specialist-table';
import { useDeleteSpecialistMutation } from '@/features/specialist/model/specialist-api';

export const Table = () => {
    const { tableLogic, isLoading } = useSpecialistTable();
    const deleteSpecialistMutation = useDeleteSpecialistMutation();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteSpecialistMutation}
            routeCreate={ROUTES.createSpecialist}
            routeEdit={ROUTES.specialistEdit}
            queryKey='specialistList'
            entityType='specialists'
            createPermission='CREATE_SPECIALIST'
            editPermission='UPDATE_SPECIALIST'
            deletePermission='DELETE_SPECIALIST'
        />
    );
};