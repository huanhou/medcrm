
'use client';

import { useMemo, useState } from 'react';
import { UiLayout, UiPagination, UISearch, UITable, RangeDatePicker } from '@/shared/ui';
import { useTransactionHistoryTable } from '../model/use-expenses-table';
import { Calendar } from '@/shared/ui/icons/calendar';


type TabType = 'service' | 'appointment';

export const Table = () => {
    const [activeTab, setActiveTab] = useState<TabType>('service');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const {
        tableLogic,
        setTransactionType,
        setStartDate: setHookStartDate,
        setEndDate: setHookEndDate,
    } = useTransactionHistoryTable();



    const visibleRows = tableLogic.table.getRowModel().rows;
    const pageTotal = useMemo(() => {
        return visibleRows.reduce((sum, row) => sum + Number(row.original.amount), 0);
    }, [visibleRows]);

    const handleTabClick = (tabType: TabType) => {
        setActiveTab(tabType);
        setTransactionType(tabType);
    };

    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        console.warn('Row clicked with ID:', id); // Временная заглушка
    };

    const tabs = [
        { title: 'Касса', type: 'service' as TabType },
        { title: 'Прием', type: 'appointment' as TabType },
    ];

    return (
        <UiLayout>
            <div className="flex flex-col px-5">
                <div className="flex items-end border-b border-stroke dark:border-dark-3">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="mr-8 cursor-pointer"
                            onClick={() => handleTabClick(tab.type)}
                        >
                            <div
                                className={`py-4 font-medium ${
                                    activeTab === tab.type ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                                }`}
                            >
                                {tab.title}
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 w-full">
                        <RangeDatePicker
                            onChange={(range) => {
                                setStartDate(range.startDate);
                                setEndDate(range.endDate);
                                setHookStartDate(range.startDate);
                                setHookEndDate(range.endDate);
                            }}
                            value={{
                                startDate: startDate,
                                endDate: endDate,
                            }}
                            className="w-[300px]"
                            prefixIcon={<Calendar size={20} className="text-white" />}
                        />
                        <UISearch onSearchChange={tableLogic.setGlobalFilter} />
                    </div>
                </div>
            </div>
            <UITable table={tableLogic.table} handleRowClick={handleRowClick} isIdColumn={false} />
            <UiPagination table={tableLogic.table} />
            {pageTotal > 0 && (
                <div className="bg-gray-100 px-4 py-2 flex justify-end gap-4 mt-2">
                    <span className="font-bold">{"Итоги"}:</span>
                    <span className="font-bold">{pageTotal.toLocaleString()} ₸</span>
                </div>
            )}
        </UiLayout>
    );
};
