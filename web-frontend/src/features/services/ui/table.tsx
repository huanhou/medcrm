'use client';

import { ROUTES } from '@/shared/constants/routs';
import { useServiceTable } from '../model/use-service-table';
import { useDeleteServiceMutation } from '../model/services-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { services, isLoading, isError, tableLogic } = useServiceTable();
    const { mutateAsync: deleteService } = useDeleteServiceMutation();

    // If data is loading or there's an error, handle it here
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading services</div>;

    const handleDelete = async (id: string) => {
        try {
            await deleteService([id]);  // Trigger the deletion mutation
            // Optionally, refetch or update local state after deletion
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={{ mutate: handleDelete }}
            routeCreate={ROUTES.createService}
            routeEdit={ROUTES.editService}
            queryKey="services"
            entityType="services"
        />
    );
};
