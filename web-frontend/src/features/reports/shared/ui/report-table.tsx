'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Loader, Dropdown, UiLayout, UiPagination, RangeDatePicker } from '@/shared/ui/';
import { ArrowDownTrayIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useDictionary } from '@/shared/lib/hooks';
import { Table } from '@tanstack/react-table';
import { UiReportTable } from './ui-report-table';
import { usePeriodOptions } from '../model/period-options';
import { Calendar } from '@/shared/ui/icons/calendar';

export type RegularPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type ExportPeriod = 'day' | 'week' | 'month' | 'year' | number;
export type ExportFormat = 'pdf' | 'excel';

export interface ReportTableProps {
    useTableHook: (period: string, date?: string) => {
        tableLogic: {
            table: Table<any>;
            setGlobalFilter: (value: string | undefined) => void;
            setDateFilter?: (date: string | null) => void;
        };
        isLoading: boolean;
        error: Error | null;
    };
    // useExportHook: () => {
    //     downloadReport: (param: any, startDate?: string, endDate?: string) => void;
    //     downloadExcelReport?: (param: any, startDate?: string, endDate?: string) => void;
    //     isLoading: boolean;
    //     error: Error | null;
    // };
    additionalControls?: ReactNode;
    initialPeriod?: string;
    isAnnual?: boolean;
    showDateRangePicker?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    onDateRangeChange?: (range: { startDate: Date | null; endDate: Date | null }) => void;
    mapPeriodToExportParam?: (period: string) => number;
}

export function ReportTable({
                                 useTableHook,
                                // useExportHook,
                                additionalControls,
                                initialPeriod = 'daily',
                                isAnnual = false,
                                showDateRangePicker = false,
                                startDate: externalStartDate,
                                endDate: externalEndDate,
                                onDateRangeChange,
                                mapPeriodToExportParam,
                            }: ReportTableProps) {
    const [period, setPeriod] = useState<string>(initialPeriod);
    // const { downloadReport, downloadExcelReport, isLoading: isExporting } = useExportHook();
    const { dictionary } = useDictionary();
    const periodOptions = usePeriodOptions(dictionary, isAnnual);
    const { buttonText } = dictionary.sharedForm;

    const [startDate, setStartDate] = useState<Date | null>(externalStartDate || null);
    const [endDate, setEndDate] = useState<Date | null>(externalEndDate || null);

    const dateRangeString =
        startDate && endDate ? `${startDate.toISOString()}|${endDate.toISOString()}` : undefined;

    const { tableLogic, isLoading, error } = useTableHook(period, dateRangeString);

    useEffect(() => {
        if (
            externalStartDate?.getTime() !== startDate?.getTime() ||
            externalEndDate?.getTime() !== endDate?.getTime()
        ) {
            setStartDate(externalStartDate ?? null);
            setEndDate(externalEndDate ?? null);
        }
    }, [externalStartDate, externalEndDate,startDate, endDate]);

    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        if (startDate || endDate) {
            setStartDate(null);
            setEndDate(null);
            if (onDateRangeChange) {
                onDateRangeChange({ startDate: null, endDate: null });
            }
            if (tableLogic.setDateFilter) {
                tableLogic.setDateFilter(null);
            }
        }
    };

    const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
        setStartDate(range.startDate);
        setEndDate(range.endDate);
        if (onDateRangeChange) {
            onDateRangeChange(range);
        }
    };

    // const handleExport = (format: ExportFormat) => {
    //     const startDateStr = startDate ? startDate.toISOString().split('T')[0] : undefined;
    //     const endDateStr = endDate ? endDate.toISOString().split('T')[0] : undefined;
    //
    //     const exportParam = mapPeriodToExportParam ? mapPeriodToExportParam(period) : period;
    //
    //     if (format === 'excel' && downloadExcelReport) {
    //         downloadExcelReport(exportParam, startDateStr, endDateStr);
    //     } else {
    //         downloadReport(exportParam, startDateStr, endDateStr);
    //     }
    // };

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <UiLayout>
            <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-wrap gap-4">
                <div className="flex gap-4 items-center flex-wrap">
                    <Dropdown
                        options={periodOptions}
                        value={period}
                        onValueChange={handlePeriodChange}
                        buttonProps={{
                            variant: 'stroke',
                            size: 'medium',
                            startIcon: <AdjustmentsHorizontalIcon className="w-5 h-5" />,
                            className: 'rounded-lg',
                        }}
                        width="w-40"
                        trigger={
                            <span className="text-sm font-medium">
                {periodOptions.find((option) => option.value === period)?.label}
              </span>
                        }
                    />

                    {showDateRangePicker && (
                        <RangeDatePicker
                            onChange={handleDateRangeChange}
                            value={{
                                startDate,
                                endDate,
                            }}
                            className="w-[300px]"
                            prefixIcon={<Calendar size={20} className="text-white" />}
                        />
                    )}

                    {additionalControls}
                </div>

                {/*<div>*/}
                {/*    <Dropdown*/}
                {/*        options={[*/}
                {/*            { value: 'pdf', label: 'PDF' },*/}
                {/*            { value: 'excel', label: 'Excel' },*/}
                {/*        ]}*/}
                {/*        onValueChange={(value) => handleExport(value as ExportFormat)}*/}
                {/*        buttonProps={{*/}
                {/*            variant: 'stroke',*/}
                {/*            size: 'medium',*/}
                {/*            startIcon: <ArrowDownTrayIcon className="w-5 h-5" />,*/}
                {/*            className: 'rounded-lg',*/}
                {/*            disabled: isExporting,*/}
                {/*            isLoading: isExporting,*/}
                {/*        }}*/}
                {/*        width="w-40"*/}
                {/*        trigger={<span className="text-sm font-medium">{buttonText.export}</span>}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

            <UiReportTable table={tableLogic.table} />
            <UiPagination table={tableLogic.table} />
        </UiLayout>
    );
}