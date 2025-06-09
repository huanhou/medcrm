import { useServices } from '../hook/use-get-services';
import { useServicesTableColumns } from '../lib/columns';
import { useTableLogic } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Service } from '@/shared/api/types';
import { useEffect, useState } from 'react';

export const useServiceTable = () => {
    const { data: services, isLoading, isError } = useServices();
    const columns = useServicesTableColumns();
    const [tableData, setTableData] = useState<Service[]>([]);

    // UseEffect to handle the table logic and avoid the warning about updating unmounted component
    useEffect(() => {
        if (services) {
            setTableData(services);  // Set the data when services is loaded
        }
    }, [services]);

    const tableLogic = useTableLogic(tableData, columns as ColumnDef<Service>[]);

    return { services, isLoading, isError, tableLogic };
};
