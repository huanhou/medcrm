import { createColumnHelper } from '@tanstack/table-core';
import { Checkbox } from '@/shared/ui';
import { useMemo } from 'react';
import { useDictionary } from '@/shared/lib/hooks';
import { Service } from '@/entities/services/types';

const columnHelper = createColumnHelper<Service>();

export const useServicesTableColumns = () => {
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
                cell: (info) => {
                    const value = info.getValue();
                    return typeof value === 'string' ? value.slice(0, 4).toUpperCase() : value; // Safely check if value is a string before calling .slice
                },
            }),
            columnHelper.accessor('name', {
                header: headers.name,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('description', {
                header: headers.description,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('price', {
                header: headers.price,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('is_active', {
                header: headers.isActive,
                cell: (info) => (
                    <div
                        className={`${
                            info.row.original.is_active ? 'bg-[#5BB79A] text-white' : 'bg-gray-1  text-gray-6'
                        } p-2 rounded text-center`}
                    >
                        {info.getValue() ? sharedForm.active : sharedForm.inactive}
                    </div>
                ),
            }),
        ];
    }, [headers, sharedForm]);
};
