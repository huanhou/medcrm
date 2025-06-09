import {useMemo } from "react";
import { useFinancialReport, useFinancialReportByDate } from "./api";
import { useFinancialReportColumns } from "../model/column";
import { useTableLogic } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FinancialReport } from "@/shared/api/types";


type PeriodType = "daily" | "weekly" | "monthly" | "yearly";

interface UseFinancialReportTableProps {
    period: PeriodType;
    startDate?: Date;
    endDate?: Date;
}

export const useFinancialReportTable = ({
                                            period,
                                            startDate,
                                            endDate,
                                        }: UseFinancialReportTableProps) => {
    const isDateRangeSelected = Boolean(startDate && endDate);

    const {
        data: reportsByDate,
        isLoading: isLoadingByDate,
        error: errorByDate,
    } = useFinancialReportByDate(startDate, endDate, {
        skip: !isDateRangeSelected,
    });

    const {
        data: reportsByPeriod,
        isLoading: isLoadingByPeriod,
        error: errorByPeriod,
    } = useFinancialReport(period, {
        skip: isDateRangeSelected,
    });

    const reportData = useMemo(() => {
        return isDateRangeSelected ? reportsByDate : reportsByPeriod;
    }, [isDateRangeSelected, reportsByDate, reportsByPeriod]);

    const columns = useFinancialReportColumns();

    const tableLogic = useTableLogic(
        reportData || [],
        columns as ColumnDef<FinancialReport>[]
    );

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
