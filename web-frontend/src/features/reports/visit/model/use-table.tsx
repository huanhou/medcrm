import { useMemo } from 'react';
import { useVisitReportColumns } from './column';
import { useTableLogic } from '@/shared/ui';
import { ColumnDef } from '@tanstack/react-table';

import type { PeriodType } from '@/shared/api/types';

type VisitReport = {
    id: string;
    visitCount: number;
    period: string;
    created_at: string;
};

interface UseVisitReportTableProps {
    period: PeriodType;
    startDate?: Date;
    endDate?: Date;
}

// Static mock data for reports by date and by period
const staticReportsByDate: VisitReport[] = [
    { id: 'v1', visitCount: 120, period: '2025-05-01', created_at: '2025-05-01T10:00:00Z' },
    { id: 'v2', visitCount: 140, period: '2025-05-02', created_at: '2025-05-02T12:00:00Z' },
];

const staticReportsByPeriod: VisitReport[] = [
    { id: 'v3', visitCount: 3500, period: '2025-04', created_at: '2025-04-30T23:59:59Z' },
    { id: 'v4', visitCount: 3200, period: '2025-03', created_at: '2025-03-31T23:59:59Z' },
];

export const useVisitReportTable = ({ period, startDate, endDate }: UseVisitReportTableProps) => {
    const isDateRangeSelected = Boolean(startDate && endDate);

    // Replace API hooks with static data and dummy states
    const reportsByDate = staticReportsByDate;
    const isLoadingByDate = false;
    const errorByDate = null;

    const reportsByPeriod = staticReportsByPeriod;
    const isLoadingByPeriod = false;
    const errorByPeriod = null;

    const reportData = useMemo(() => {
        return isDateRangeSelected ? reportsByDate : reportsByPeriod;
    }, [isDateRangeSelected, reportsByDate, reportsByPeriod]);

    const columns = useVisitReportColumns();

    const tableLogic = useTableLogic(reportData || [], columns as ColumnDef<VisitReport>[]);

    const handleSetGlobalFilter = (value: string | undefined) => {
        tableLogic.setGlobalFilter(value);
    };

    return {
        data: {
            table: tableLogic.table,
            setGlobalFilter: handleSetGlobalFilter,
        },
        isLoading: isDateRangeSelected ? isLoadingByDate : isLoadingByPeriod,
        error: isDateRangeSelected ? errorByDate : errorByPeriod,
    };
};
