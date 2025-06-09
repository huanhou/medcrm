import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
import { Appointment } from '@/entities/appointment/types';

const columnHelper = createColumnHelper<Appointment>();

export const useAppointmentsTableColumns = () => {
    const { dictionary } = useDictionary();
    const { headers, sharedForm } = dictionary;

    return useMemo(() => {
        return [
            columnHelper.display({
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className='checkbox'
                    />
                ),
                size: 10,
            }),
            columnHelper.accessor('id', {
                header: headers.id,
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('patient_fio', {
                header: headers.fio,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('doctor_fio', {
                header: headers.doctor,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('date_time', {
                header: headers.dateTime,
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y H:i'),
            }),
            columnHelper.accessor('status', {
                header: headers.status,
                cell: (info) => (
                    <div
                        className={`${
                            info.row.original.status === sharedForm.statuses.completed
                                ? 'bg-[#5BB79A] text-white'
                                : info.row.original.status === sharedForm.statuses.cancelled
                                    ? 'bg-[#ED2124] text-white'
                                    : 'bg-gray-1 text-gray-6'
                        } p-2 rounded text-center`}
                    >
                        {info.getValue()}
                    </div>
                ),
            }),
        ];
    }, [headers, sharedForm]);
};
