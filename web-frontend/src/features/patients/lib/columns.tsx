import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { DateFormat } from '@/shared/helpers/date-format';
import { Patient } from '@/entities/patients/types';

const columnHelper = createColumnHelper<Patient>();

export const usePatientsTableColumns = () => {
    const { dictionary } = useDictionary();
    const { headers } = dictionary;

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
                cell: (info) => {
                    const value = info.getValue();
                    return value ? value.slice(0, 4).toUpperCase() : ''; // Safely handle undefined/null
                },
            }),
            columnHelper.accessor('fio', {
                header: headers.fio,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('phone', {
                header: headers.phone,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('iin', {
                header: headers.iin,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('description', {
                header: headers.description,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('created_at', {
                header: headers.registrationDate,
                cell: (info) => DateFormat(info.getValue() as string, 'd.m.Y H:i'),
            }),
        ];
    }, [headers]);
};
