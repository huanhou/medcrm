'use client';

import { createColumnHelper } from '@tanstack/table-core';
import { useMemo } from 'react';
import { Checkbox } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';

type Service = {
    id: string;
    name: string;
    price: number;
};

const columnHelper = createColumnHelper<Service>();

interface UseBoxOfficeTableColumnsProps {
    selectedStaffName: string;
}

export const useBoxOfficeTableColumns = ({ selectedStaffName }: UseBoxOfficeTableColumnsProps) => {
    const { dictionary } = useDictionary();
    const { sharedForm } = dictionary;

    return useMemo(
        () => [
            columnHelper.display({
                id: 'select',
                header: ({ table }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                            checked={table.getIsAllRowsSelected()}
                            indeterminate={table.getIsSomeRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                            className='checkbox'
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            indeterminate={row.getIsSomeSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            className='checkbox'
                        />
                    </div>
                ),
                size: 10,
            }),
            columnHelper.accessor('id', {
                header: 'ID',
                cell: ({ getValue }) => getValue().slice(0, 4).toUpperCase(),
                size: 80,
            }),
            columnHelper.accessor('name', {
                header: sharedForm.labels.service,
                size: 250,
            }),
            columnHelper.accessor('price', {
                header: sharedForm.labels.price,
                cell: ({ getValue }) => `${getValue()} ₸`,
                size: 100,
            }),
            columnHelper.display({
                id: 'specialist_id',
                header: sharedForm.labels.doctor,
                cell: () => selectedStaffName || '-',
                size: 150,
            }),
            columnHelper.display({
                id: 'date',
                header: sharedForm.labels.dateTime,
                cell: () => {
                    const today = new Date();
                    return today.toLocaleDateString('ru-RU');
                },
                size: 120,
            }),
        ],
        [selectedStaffName, sharedForm]
    );
};
