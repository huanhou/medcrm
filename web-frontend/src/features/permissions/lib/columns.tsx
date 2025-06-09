import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { CreatePermissionDto } from '@/shared/api/types';

export interface permission extends CreatePermissionDto {
    id: string;
}

const columnHelper = createColumnHelper<permission>();

export const usePermissonsTableColumns = () => {
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
                cell: (info) => {
                    const val = info.getValue();
                    return typeof val === 'string' ? val.slice(0, 4).toUpperCase() : '';
                },

            }),
            columnHelper.accessor('name', {
                header: headers.name,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('description', {
                header: headers.description,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('code', {
                header: headers.code,
                cell: (info) => info.getValue(),
            }),
        ];
    }, [headers]);
};
