import { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { FC, useCallback, MouseEvent } from 'react';
import { useDictionary } from '@/shared/lib/hooks';

interface UITableProps {
    table: Table<any>;
    handleRowClick: (e: MouseEvent<HTMLTableRowElement>, id: string) => void;
    isIdColumn?: boolean;
    totals?: Record<string, string | number>;
}

export const UITable: FC<UITableProps> = ({ table, handleRowClick, isIdColumn = true, totals }) => {
    const { dictionary } = useDictionary();
    const onRowClick = useCallback(
        (event: MouseEvent<HTMLTableRowElement>, id: string) => {
            if (
                (event.target as HTMLElement).classList.contains('checkbox') ||
                (event.target as HTMLElement).closest('.checkbox') ||
                (event.target as HTMLElement).tagName === 'INPUT'
            ) {
                return;
            }
            handleRowClick(event, id);
        },
        [handleRowClick]
    );

    const getColumnClass = (index: number) => {
        if (isIdColumn) {
            if (index === 0) return 'w-[50px]';
            if (index === 1) return 'w-[70px]';
        }
        return 'w-auto';
    };

    return (
        <table className='datatable-table w-full table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8'>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                        <th key={header.id} colSpan={header.colSpan} className={getColumnClass(index)}>
                            {header.isPlaceholder ? null : (
                                <div
                                    className={header.column.getCanSort() ? 'cursor-pointer select-none flex items-center gap-2' : ''}
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={
                                        header.column.getCanSort()
                                            ? header.column.getNextSortingOrder() === 'asc'
                                                ? 'Sort ascending'
                                                : header.column.getNextSortingOrder() === 'desc'
                                                    ? 'Sort descending'
                                                    : 'Clear sort'
                                            : undefined
                                    }
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}

                                    {index !== 0 && (
                                        <div className='ml-2 inline-flex flex-col space-y-[2px]'>
                        <span className='inline-block'>
                          <svg
                              className='fill-current'
                              width='10'
                              height='5'
                              viewBox='0 0 10 5'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M5 0L0 5H10L5 0Z' fill='' />
                          </svg>
                        </span>
                                            <span className='inline-block'>
                          <svg
                              className='fill-current'
                              width='10'
                              height='5'
                              viewBox='0 0 10 5'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z' fill='' />
                          </svg>
                        </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='cursor-pointer' onClick={(event) => onRowClick(event, row.original.id)}>
                    {row.getVisibleCells().map((cell, index) => (
                        <td key={cell.id} className={getColumnClass(index)}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}

            {totals && (
                <tr className="cursor-pointer bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-600 font-semibold">
                    {table.getAllColumns().map((column) => {
                        const accessor = column.id;
                        const value = totals[accessor];

                        if (column.id === 'select') {
                            return (
                                <td key={column.id} className="px-6 py-4"></td>
                            );
                        }

                        if (column.id === 'select') {
                            return (
                                <td key={column.id} className="px-6 py-4"></td>
                            );
                        }


                        if (column.id === 'id') {
                            return (
                                <td key={column.id} className="w-auto" >
                                    <p className='font-bold'>
                                        {dictionary.common?.total || 'Итого'}
                                    </p>
                                </td>
                            );
                        }
                        if (value !== undefined && value !== null) {
                            return (
                                <td key={accessor} className="w-auto text-primary border-b-2 border-primary">
                                    <p className='font-bold'>
                                        {typeof value === 'number' ? `${value.toLocaleString()} ₸` : value ?? ''}
                                    </p>
                                </td>
                            );
                        }
                        return <td key={column.id} className="px-6 py-4"></td>;
                    })}
                </tr>
            )}
            </tbody>
        </table>
    );
};
