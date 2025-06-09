import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { ExpenseCategory } from '@/shared/api/types';
import { DateFormat } from '@/shared/helpers/date-format';

const columnHelper = createColumnHelper<ExpenseCategory>();

export const useExpenseCategoryTableColumns = () => {
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
                header: headers.id || 'ID',  // Fallback in case headers are missing
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('name', {
                header: headers.name || 'Name',  // Fallback
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('description', {
                header: headers.description || 'Description',  // Fallback
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('created_at', {
                header: headers.createdAt || 'Created At',  // Fallback
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y'),
            }),
        ];
    }, [headers]);
};
