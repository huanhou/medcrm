import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiInstance } from "@/shared/api/api-instance";
import { API_ENDPOINTS } from "@/shared/api/constants/endpoints";
import { ERROR_MESSAGE } from "@/shared/constants/errors";
import {
    getExpenseReport,
    getExpenseReportByDate,
    getVisitReport,
} from "@/shared/api/generated";

const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const downloadExpenseReportPdf = (
    period: "daily" | "weekly" | "monthly" | "yearly",
    startDate?: string,
    endDate?: string
) => {
    let url = `/expenses_report/${period}`;
    if (startDate && endDate) {
        url = `/expenses_report/${startDate}/${endDate}`;
    }
    downloadFile(url);
};

export const downloadExpenseReportExcel = (
    period: "daily" | "weekly" | "monthly" | "yearly",
    startDate?: string,
    endDate?: string
) => {
    let url = `/expenses_report/${period}?format=excel`;
    if (startDate && endDate) {
        url = `/expenses_report/${startDate}/${endDate}?format=excel`;
    }
    downloadFile(url);
};

export const useExpenseReport = (
    period: "daily" | "weekly" | "monthly" | "yearly",
    options?: { skip?: boolean }
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["expenseReport", period],
        queryFn: () => getExpenseReport(period),
        enabled: !options?.skip,
        staleTime: 60 * 60 * 1000,
    });

    return { data, isLoading, error };
};

export const useExpenseReportByDate = (
    start_date?: Date,
    end_date?: Date,
    options?: { skip?: boolean }
) => {
    return useQuery({
        queryKey: [
            "expenseReportByDate",
            start_date?.toISOString() ?? null,
            end_date?.toISOString() ?? null,
        ],
        queryFn: () => getExpenseReportByDate(start_date, end_date),
        enabled: !options?.skip && !!start_date && !!end_date,
        staleTime: 60 * 60 * 1000,
    });
};

export function useGetVisitReportQuery(
    period: "daily" | "weekly" | "monthly" | "yearly"
) {
    return useQuery({
        queryKey: ["visit-report", period],
        queryFn: () => getVisitReport(period),
        staleTime: 60 * 60 * 1000,
    });
};
