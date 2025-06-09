'use client';

import {ROUTES} from '@/shared/constants/routs';
import {usePatientsTable} from '../model/use-patients-table';
import {useDeletePatientMutation} from '../model/patients-api';
import {GenericTable} from '@/shared/ui';

export const Table = () => {
    const {tableLogic} = usePatientsTable();
    const deletePatientMutation = useDeletePatientMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deletePatientMutation}
            routeCreate={ROUTES.createPatient}
            routeEdit={ROUTES.editPatient}
            queryKey='patients'
            entityType='patients'
            createPermission='CREATE_PATIENT'
            editPermission='UPDATE_PATIENT'
            deletePermission='DELETE_PATIENT'
        />
    );
};
