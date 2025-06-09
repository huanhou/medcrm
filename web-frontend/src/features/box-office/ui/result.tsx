'use client';

import React, { useState, useCallback } from 'react';
import { ReusableModal, UiLayout, Button } from '@/shared/ui';
import { TrashIcon } from '@heroicons/react/24/outline';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useDictionary } from '@/shared/lib/hooks';
import { useBoxOfficeTableColumns } from '../lib/columns';

interface Service {
    id: string;
    name: string;
    price: number;
}

interface BoxOfficeResultProps {
    formData: { service_id: string[] } | null;
    selectedStaffName?: string;
    onPaymentComplete?: () => void;
    onServicesUpdate?: (serviceIds: string[]) => void;
}

const staticServices: Service[] = [
    { id: 'srv1', name: 'Услуга 1', price: 1000 },
    { id: 'srv2', name: 'Услуга 2', price: 2000 },
    { id: 'srv3', name: 'Услуга 3', price: 1500 },
];

export const BoxOfficeResult: React.FC<BoxOfficeResultProps> = ({
                                                                    formData,
                                                                    selectedStaffName,
                                                                    onPaymentComplete,
                                                                    onServicesUpdate,
                                                                }) => {
    const { dictionary } = useDictionary();
    const { sharedForm, successNotifications, buttons } = dictionary;

    const [localSelectedServices, setLocalSelectedServices] = useState<Service[]>(staticServices);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({});

    const selectedIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

    const totalAmount = localSelectedServices.reduce((sum, s) => sum + (s.price || 0), 0);

    const columns = useBoxOfficeTableColumns({ selectedStaffName: selectedStaffName || '' });

    const table = useReactTable({
        data: localSelectedServices,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
    });

    const handleConfirmDelete = useCallback(() => {
        if (selectedIds.length > 0 && formData?.service_id) {
            const updatedServices = localSelectedServices.filter((service) => !selectedIds.includes(service.id));
            setLocalSelectedServices(updatedServices);
            setRowSelection({});

            if (onServicesUpdate) {
                const updatedServiceIds = updatedServices.map((s) => s.id);
                onServicesUpdate(updatedServiceIds);
            }

            // TODO: заменить alert на toast, если есть
            alert(successNotifications.deleteService);
        }
        setModalOpen(false);
    }, [selectedIds, formData, localSelectedServices, onServicesUpdate, successNotifications]);

    const handlePayment = () => {
        if (onPaymentComplete) onPaymentComplete();
        alert('Оплата завершена'); // TODO: заменить alert на toast, если есть
    };

    if (!formData || localSelectedServices.length === 0) return null;

    const handleRowClick = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
        if (
            (e.target as HTMLElement).classList.contains('checkbox') ||
            (e.target as HTMLElement).closest('.checkbox')
        ) {
            return;
        }
    }, []);

    const renderTableHeader = useCallback(() => (
        <div className='flex justify-between items-center px-6.5 py-4 border-b border-stroke dark:border-dark-3'>
            <h3 className='font-medium text-lg'>{sharedForm.labels.result}</h3>
            <Button
                startIcon={<TrashIcon className='size-5' />}
                variant='outlined'
                className='rounded-lg'
                disabled={!selectedIds.length}
                onClick={() => setModalOpen(true)}
            >
                {buttons.delete}
            </Button>
        </div>
    ), [sharedForm.labels, buttons, selectedIds]);

    const renderTableFooter = useCallback(() => (
        <div className='flex justify-between items-center px-6.5 py-4 bg-gray-50'>
            <div className='flex items-center space-x-2'>
                <span className='font-medium'>{sharedForm.labels.total}:</span>
                <span className='text-lg font-bold'>{totalAmount} ₸</span>
            </div>
            <Button
                className='rounded-[7px]'
                variant='primary'
                onClick={handlePayment}
                disabled={false}
            >
                {buttons.acceptPayment}
            </Button>
        </div>
    ), [sharedForm.labels, totalAmount, buttons]);

    return (
        <UiLayout>
            <ReusableModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={dictionary.modal.titleService}
                message={dictionary.modal.messageService}
                onConfirm={handleConfirmDelete}
            />

            {renderTableHeader()}
            <table className='w-full table-auto border-collapse'>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className='border-b border-stroke'>
                        {headerGroup.headers.map((header, index) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className={`px-4 py-3 text-left text-gray-600 font-medium ${index === 0 ? 'w-16' : ''}`}
                            >
                                {!header.isPlaceholder && (
                                    <div
                                        className={`${header.column.getCanSort() ? 'cursor-pointer select-none' : ''} flex items-center`}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        key={row.id}
                        className='border-b border-stroke hover:bg-gray-50 cursor-pointer'
                        onClick={handleRowClick}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className='px-4 py-3'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {renderTableFooter()}
        </UiLayout>
    );
};
