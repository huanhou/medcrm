import { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { FC } from 'react';

interface UiReportTableProps {
    table: Table<any>;
}

export const UiReportTable: FC<UiReportTableProps> = ({ table }) => {
    return (
        <table className='datatable-table w-full table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8'>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                        <th key={header.id} colSpan={header.colSpan}>
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
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};
