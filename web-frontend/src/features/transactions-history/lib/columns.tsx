import { createColumnHelper } from '@tanstack/table-core';
import { useMemo } from 'react';
import { TransactionHistory } from '@/entities/history/types';
import { TransactionType } from '../model/use-expenses-table';

const columnHelper = createColumnHelper<TransactionHistory>();

interface AppointmentTransactionHistory extends TransactionHistory {
    doctor?: string;
    date?: string;
}

const appointmentColumnHelper = createColumnHelper<AppointmentTransactionHistory>();

export const useTransactionHistoryTableColumns = (type: TransactionType = 'service') => {
    return useMemo(() => {
        if (type === 'service') {
            return [
                columnHelper.accessor('id', {
                    header: 'ID',
                    cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
                }),
                columnHelper.accessor('service', {
                    header: 'Услуга',
                    cell: (info) => info.getValue(),
                }),
                columnHelper.accessor('patient', {
                    header: 'Пациент',
                    cell: (info) => info.getValue(),
                }),
                columnHelper.accessor('amount', {
                    header: 'Сумма',
                    cell: (info) => `${(info.getValue() / 1).toLocaleString()} ₸`,
                }),
                columnHelper.accessor('payment_method', {
                    header: 'Способ оплаты',
                    cell: (info) => (info.getValue().toUpperCase() === 'CASH' ? 'Наличные' : 'Карта'),
                }),
            ];
        }

        return [
            appointmentColumnHelper.accessor('id', {
                header: 'ID',
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            appointmentColumnHelper.accessor('doctor', {
                header: 'Врач',
                cell: (info) => info.getValue() || '-',
            }),
            appointmentColumnHelper.accessor('patient', {
                header: 'Пациент',
                cell: (info) => info.getValue(),
            }),
            appointmentColumnHelper.accessor('date', {
                header: 'Дата и время',
                cell: (info) => info.getValue() || '-',
            }),
        ];
    }, [type]);
};
