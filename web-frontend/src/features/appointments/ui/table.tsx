'use client';

import { ROUTES } from '@/shared/constants/routs';
import { useAppointmentsTable } from '../model/use-appointment-table';
import { useDeleteAppointmentMutation } from '../model/appointment-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { tableLogic } = useAppointmentsTable();
    const deleteAppointmentMutation = useDeleteAppointmentMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteAppointmentMutation}
            routeCreate={ROUTES.createAppointment}
            routeEdit={ROUTES.editAppointment}
            queryKey='appointments'
            entityType='appointments'
            createPermission='CREATE_APPOINTMENT'
            editPermission='UPDATE_APPOINTMENT'
            deletePermission='DELETE_APPOINTMENT'
        />
    );
};
