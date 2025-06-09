import { createColumnHelper } from '@tanstack/table-core';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
import { FinancialReport } from '@/shared/api/types';

const columnHelper = createColumnHelper<FinancialReport>();

export const useFinancialReportColumns = () => {
    const { dictionary } = useDictionary();
    const { headers } = dictionary;

    return useMemo(() => {
        return [
            columnHelper.accessor('id', {
                header: headers.id,
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('totalRevenue', {
                header: headers.totalRevenue,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('totalTransactions', {
                header: headers.totalTransactions,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('created_at', {
                header: headers.dateTime,
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y H:i'),
            }),
        ];
    }, [headers]);
};
