'use client';

import React from 'react';
import { Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { useDictionary } from '@/shared/lib/hooks';

interface PaginationProps {
    table: Table<any>;
}

const SIBLING_COUNT = 2;

const LeftArrowIcon: React.FC = () => (
    <svg
        className='fill-current'
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z'
            fill=''
        />
    </svg>
);

const RightArrowIcon: React.FC = () => (
    <svg
        className='fill-current'
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z'
            fill=''
        />
    </svg>
);

const getVisiblePages = (pageIndex: number, pageCount: number): number[] => {
    const startPage = Math.max(pageIndex - SIBLING_COUNT, 0);
    const endPage = Math.min(pageIndex + SIBLING_COUNT + 1, pageCount);
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
};

export const UiPagination: React.FC<PaginationProps> = ({ table }) => {
    const { pagination } = table.getState();
    const pageIndex = pagination.pageIndex;
    const pageCount = table.getPageCount();
    const { dictionary } = useDictionary();

    const visiblePages = getVisiblePages(pageIndex, pageCount);

    return (
        <div className='flex justify-between px-6 py-5'>
            <p className='font-medium'>
                {dictionary.pagination.showing} {pageIndex + 1} {dictionary.pagination.of} {pageCount}{' '}
                {dictionary.pagination.pages}
            </p>
            <div className='flex items-center'>
                <button
                    className='flex cursor-pointer items-center justify-center rounded-[3px] p-[7px] px-[7px] hover:bg-primary hover:text-white'
                    onClick={() => table.setPageIndex(0)}
                    disabled={pageIndex === 0}
                    aria-label='First page'
                >
                    <LeftArrowIcon />
                </button>

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => table.setPageIndex(page)}
                        className={clsx(
                            'mx-1 flex cursor-pointer items-center justify-center rounded-[3px] px-[10px] py-[5px] hover:bg-primary hover:text-white',
                            pageIndex === page && 'bg-primary text-white'
                        )}
                        aria-current={pageIndex === page}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    className='flex cursor-pointer items-center justify-center rounded-[3px] p-[7px] px-[7px] hover:bg-primary hover:text-white'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label='Next page'
                >
                    <RightArrowIcon />
                </button>
            </div>
        </div>
    );
};
