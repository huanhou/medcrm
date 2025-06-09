'use client';
import { useState } from 'react';
import { ReportTable } from '../../shared/ui';
import { useFinancialReportTable } from '../model/use-table';
import { ROUTES } from '@/shared/constants/routs';
const useDummyExportFinancialReport = () => {
    const downloadReport = (period: string, startDateStr?: string, endDateStr?: string) => {
        console.log('Mock downloadReport called with:', period, startDateStr, endDateStr);
    };
    const downloadExcelReport = (period: string, startDateStr?: string, endDateStr?: string) => {
        console.log('Mock downloadExcelReport called with:', period, startDateStr, endDateStr);
    };
    const isLoading = false;
    const error = null;

    return { downloadReport, downloadExcelReport, isLoading, error };
};
export const FinancialReportTable = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const handleTableHook = (periodValue: string, dateString?: string) => {
        const periodToUse = periodValue as 'daily' | 'weekly' | 'monthly' | 'yearly';
        let currentStartDate = startDate;
        let currentEndDate = endDate;
        if (dateString && dateString.includes('|')) {
            const [startStr, endStr] = dateString.split('|');
            if (startStr && endStr) {
                currentStartDate = new Date(startStr);
                currentEndDate = new Date(endStr);
            }
        }
        const { data, isLoading, error } = useFinancialReportTable({
            period: periodToUse,
            startDate: currentStartDate || undefined,
            endDate: currentEndDate || undefined,
        });
        return {
            tableLogic: {
                table: data?.table || {},
                setGlobalFilter: data?.setGlobalFilter || (() => {}),
                setDateFilter: (date: string | null) => {
                    if (date && date.includes('|')) {
                        const [start, end] = date.split('|');
                        setStartDate(new Date(start));
                        setEndDate(new Date(end));
                    } else {
                        setStartDate(null);
                        setEndDate(null);
                    }
                },
            },
            isLoading,
            error,
        };
    };
    const handleExportHook = () => {
        const { downloadReport, downloadExcelReport, isLoading, error } = useDummyExportFinancialReport();
        const mapPeriodToExportParam = (period: string) => {
            const periodMapping = {
                daily: 'day',
                weekly: 'week',
                monthly: 'month',
                yearly: 'year',
            };
            return (periodMapping[period as keyof typeof periodMapping] ?? 'day') as
                | 'day'
                | 'week'
                | 'month'
                | 'year';
        };
        const wrappedDownloadReport = (period: string, startDateStr?: string, endDateStr?: string) => {
            const exportPeriod = mapPeriodToExportParam(period);
            downloadReport(exportPeriod, startDateStr, endDateStr);
        };
        const wrappedDownloadExcelReport = (period: string, startDateStr?: string, endDateStr?: string) => {
            const exportPeriod = mapPeriodToExportParam(period);
            downloadExcelReport(exportPeriod, startDateStr, endDateStr);
        };
        return {
            downloadReport: wrappedDownloadReport,
            downloadExcelReport: wrappedDownloadExcelReport,
            isLoading,
            error,
        };
    };

    const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
        setStartDate(range.startDate);
        setEndDate(range.endDate);
    };

    return (
        <ReportTable
            useTableHook={handleTableHook}
            useExportHook={handleExportHook}
            initialPeriod="daily"
            showDateRangePicker={true}
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={handleDateRangeChange}
        />
    );
};
