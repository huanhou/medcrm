import { Employee } from '@/entities/staff/types';
import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';

const columnHelper = createColumnHelper<Employee>();

export const useStaffTableColumns = () => {
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
            }),
            columnHelper.accessor('id', {
                header: headers.id,
                cell: (info) => info.getValue().slice(0, 4).toUpperCase(),
            }),
            columnHelper.accessor('fio', {
                header: headers.name,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('email', {
                header: headers.email,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('phone', {
                header: headers.phone,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('address', {
                header: headers.address,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('filial', {
                header: headers.filial,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('role', {
                header: headers.role,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('status', {
                header: headers.status,
                cell: (info) => (
                    <div
                        className={`${
                            info.row.original.status === sharedForm.active ? 'bg-[#5BB79A] text-white' : 'bg-gray-1 text-gray-6'
                        } p-2 rounded text-center`}
                    >
                        {info.getValue()}
                    </div>
                ),
            }),
        ];
    }, [headers, sharedForm]);
};
