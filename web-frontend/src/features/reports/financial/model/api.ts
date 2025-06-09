
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/api-instance";
import { API_ENDPOINTS } from "@/shared/api/constants/endpoints";
import { ERROR_MESSAGE } from "@/shared/constants/errors";
import {
    getFinancialReport,
    getVisitReport,
    getFinancialReportByDate,
} from "@/shared/api/generated";


export const useFinancialReport = (
    period: "daily" | "weekly" | "monthly" | "yearly",
    options?: { skip?: boolean }
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["financialReport", period],
        queryFn: () => getFinancialReport(period),
        enabled: !options?.skip,
        staleTime: 60 * 60 * 1000,
    });

    return { data, isLoading, error };
};

export const useExportFinancialReport = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleDownload = async (url: string) => {
        try {
            setIsLoading(true);
            const response = await apiInstance({ url, method: "get" });

            if (response?.data?.fileUrl) {
                window.open(response.data.fileUrl, "_blank");
            } else {
                throw new Error(ERROR_MESSAGE.FILE_NOT_FOUND);
            }
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error(ERROR_MESSAGE.FILE_ERROR)
            );
            console.error(ERROR_MESSAGE.FILE_ERROR, err);
        } finally {
            setIsLoading(false);
        }
    };

    // const downloadReport = (
    //     period: "day" | "week" | "month" | "year",
    //     startDate?: string,
    //     endDate?: string
    // ) => {
    //     let url = API_ENDPOINTS.FINANCIAL_REPORT.EXPORT_PDF(period);
    //     if (startDate || endDate) {
    //         url += `?start_date=${startDate || ""}&end_date=${endDate || ""}`;
    //     }
    //     handleDownload(url);
    // };
    //
    // const downloadExcelReport = (
    //     period: "day" | "week" | "month" | "year",
    //     startDate?: string,
    //     endDate?: string
    // ) => {
    //     let url = API_ENDPOINTS.FINANCIAL_REPORT.EXPORT_EXCEL(period);
    //     if (startDate || endDate) {
    //         url += `?start_date=${startDate || ""}&end_date=${endDate || ""}`;
    //     }
    //     handleDownload(url);
    // };
//
//     return { downloadReport, downloadExcelReport, isLoading, error };
 };

export function useGetVisitReportQuery(
    period: "daily" | "weekly" | "monthly" | "yearly"
) {
    return useQuery({
        queryKey: ["visit-report", period],
        queryFn: async () => await getVisitReport(period),
        staleTime: 60 * 60 * 1000,
    });
}

export function useFinancialReportByDate(
    start_date?: Date,
    end_date?: Date,
    options?: { skip?: boolean }
) {
    return useQuery({
        queryKey: [
            "financial-report",
            start_date?.toISOString() ?? null,
            end_date?.toISOString() ?? null,
        ],
        queryFn: async () => await getFinancialReportByDate(start_date, end_date),
        enabled: !options?.skip && !!start_date && !!end_date,
        staleTime: 60 * 60 * 1000,
    });
}
