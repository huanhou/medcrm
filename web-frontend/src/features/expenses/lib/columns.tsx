
import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
import { Expense } from '@/entities/expenses/types';

const columnHelper = createColumnHelper<Expense>();

export const useExpenseTableColumns = () => {
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
            columnHelper.accessor('category', {
                header: headers.default,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('amount', {
                header: headers.amount,
                cell: (info) => `${(info.getValue() / 1).toLocaleString()} ₸`,
            }),
            columnHelper.accessor('description', {
                header: headers.description,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('staffName', {
                header: headers.staff,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('created_at', {
                header: headers.createdAt,
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y'),
            }),
        ];
    }, [headers]);
};

