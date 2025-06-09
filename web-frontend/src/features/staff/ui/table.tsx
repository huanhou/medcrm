'use client';

import { GenericTable, Loader } from '@/shared/ui';
import { ROUTES } from '@/shared/constants/routs';
import { useStaffTable } from '../model/use-staff-table';
import { useDeleteStaffMutation } from '@/features/staff/model/staff-api';

export const Table = () => {
    const { tableLogic, isLoading } = useStaffTable();
    const deleteStaffMutation = useDeleteStaffMutation();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteStaffMutation}
            routeCreate={ROUTES.createStaff}
            routeEdit={ROUTES.staffEdit}
            queryKey='staffList'
            entityType='staff'
            createPermission='CREATE_STAFF'
            editPermission='UPDATE_STAFF'
            deletePermission='DELETE_STAFF'
        />
    );
};
