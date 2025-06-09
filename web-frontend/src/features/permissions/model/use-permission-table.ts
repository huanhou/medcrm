import { usePermission } from '../hook/use-get-permission';
import { usePermissonsTableColumns } from '../lib/columns';
import { useTableLogic } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';
import { permission } from '../lib/columns';

export const usePermissionTable = () => {
    const { data: permissions, isLoading, isError } = usePermission();
    const columns = usePermissonsTableColumns();
    const tableLogic = useTableLogic(permissions || [], columns as ColumnDef<permission>[]);

    return { permissions, isLoading, isError, tableLogic };
};
