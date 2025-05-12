import { useDictionary } from '@/shared/lib/hooks';
import React, { ChangeEvent } from 'react';

interface UISearchProps {
    onSearchChange: (value: string | undefined) => void;
}

export const UISearch: React.FC<UISearchProps> = ({ onSearchChange }) => {
    const { dictionary } = useDictionary();
    return (
        <div className='flex justify-between px-7.5 py-4.5'>
            <div className='relative z-20 w-full max-w-[200px] lg:min-w-[414px]'>
                <input
                    type='text'
                    placeholder={`${dictionary.search}...`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value || undefined)}
                    className='w-full rounded-[7px] border border-stroke bg-[#F6F8FB] px-5 py-2.5 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary'
                />
                <button className='absolute right-0 top-0 flex h-11.5 w-11.5 items-center justify-center rounded-r-md'>
                    <svg
                        className='fill-current'
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z'
                            fill=''
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M11.958 11.957C12.2508 11.6641 12.7257 11.6641 13.0186 11.957L16.2811 15.2195C16.574 15.5124 16.574 15.9872 16.2811 16.2801C15.9882 16.573 15.5133 16.573 15.2205 16.2801L11.958 13.0176C11.6651 12.7247 11.6651 12.2499 11.958 11.957Z'
                            fill=''
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
