import { useState, useMemo } from "react";
import { useTableLogic } from "@/shared/ui";
import { useExpenseReport, useExpenseReportByDate } from "./api";
import { ExpenseReport } from "@/shared/api/types";
import { useExpenseReportColumns } from "./column";
import { ColumnDef } from "@tanstack/table-core";

type PeriodType = "daily" | "weekly" | "monthly" | "yearly";

interface UseExpenseReportTableProps {
    period: PeriodType;
    startDate?: Date;
    endDate?: Date;
}

export const useExpenseReportTable = ({
                                          period,
                                          startDate,
                                          endDate,
                                      }: UseExpenseReportTableProps) => {
    const isDateRangeSelected = Boolean(startDate && endDate);
    const [globalFilter, setGlobalFilter] = useState("");

    const {
        data: reportsByDate,
        isLoading: isLoadingByDate,
        error: errorByDate,
    } = useExpenseReportByDate(startDate, endDate, {
        skip: !isDateRangeSelected,
    });

    const {
        data: reportsByPeriod,
        isLoading: isLoadingByPeriod,
        error: errorByPeriod,
    } = useExpenseReport(period, {
        skip: isDateRangeSelected,
    });

    const reportData = useMemo(() => {
        return isDateRangeSelected ? reportsByDate : reportsByPeriod;
    }, [isDateRangeSelected, reportsByDate, reportsByPeriod]);

    const columns = useExpenseReportColumns();

    const tableLogic = useTableLogic(
        reportData || [],
        columns as ColumnDef<ExpenseReport>[]
    );

    const handleSetGlobalFilter = (value: string | undefined) => {
        setGlobalFilter(value || "");
        tableLogic.setGlobalFilter(value);
    };

    return {
        data: {
            table: tableLogic.table,
            setGlobalFilter: handleSetGlobalFilter,
            globalFilter,
        },
        isLoading: isDateRangeSelected ? isLoadingByDate : isLoadingByPeriod,
        error: isDateRangeSelected ? errorByDate : errorByPeriod,
    };
};