import { createColumnHelper } from '@tanstack/table-core';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
import { ExpenseReport } from '@/shared/api/types';

const columnHelper = createColumnHelper<ExpenseReport>();

export const useExpenseReportColumns = () => {
    const { dictionary } = useDictionary();
    const { headers } = dictionary;

    return useMemo(() => {
        return [
            columnHelper.accessor('id', {
                header: headers.id,
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('categoriesSummary', {
                header: headers.categories,
                cell: (info) => {
                    const categories = info.getValue();
                    if (typeof categories === 'object' && categories !== null) {
                        return Object.entries(categories)
                            .map(([category, amount]) => `${category}: ${amount}`)
                            .join(', ');
                    }
                    return '-';
                },
            }),
            columnHelper.accessor('totalExpenses', {
                header: headers.totalExpenses,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('created_at', {
                header: headers.dateTime,
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y H:i'),
            }),
        ];
    }, [headers]);
};