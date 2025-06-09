import { createColumnHelper } from '@tanstack/table-core';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
type VisitReport = {
    id: string;
    totalVisits: number;
    visitsByService: Record<string, number> | null;
    created_at: string;
};
const columnHelper = createColumnHelper<VisitReport>();
export const useVisitReportColumns = () => {
    const { dictionary } = useDictionary();
    const { headers } = dictionary;

    return useMemo(() => [
        columnHelper.accessor('id', {
            header: headers.id,
            cell: info => info.getValue().slice(0, 4).toUpperCase(),
        }),
        columnHelper.accessor('totalVisits', {
            header: headers.totalVisits,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('visitsByService', {
            header: headers.services,
            cell: info => {
                const serviceVisits = info.getValue();
                if (typeof serviceVisits === 'object' && serviceVisits !== null) {
                    const totalServiceVisits = Object.values(serviceVisits).reduce(
                        (sum, count) => sum + (count as number),
                        0
                    );
                    return totalServiceVisits;
                }
                return 0;
            },
        }),
        columnHelper.accessor('created_at', {
            header: headers.dateTime,
            cell: info => DateFormat(info.getValue() as string, 'd.m.Y H:i'),
        }),
    ], [headers]);
};
