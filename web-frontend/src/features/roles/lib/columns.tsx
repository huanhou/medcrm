import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { Role } from '@/entities/roles/types';

const columnHelper = createColumnHelper<Role>();

export const useRolesTableColumns = () => {
    const { dictionary } = useDictionary();
    const { headers } = dictionary;

    return useMemo(() => {
        return [
            columnHelper.display({
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className='checkbox'
                    />
                ),
                size: 10,
            }),
            columnHelper.accessor('id', {
                header: headers.id,
                cell: (info) => String(info.getValue()).slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('name', {
                header: headers.role,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('permissions', {
                header: headers.permission,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('staffCount', {
                header: headers.staff,
                cell: (info) => info.getValue(),
            }),
        ];
    }, [headers]);
};
