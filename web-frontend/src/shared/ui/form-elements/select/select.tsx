import { ReactNode, useId } from 'react';
import clsx from 'clsx';
import { SelectProps } from '../types';

export const Select = ({
                           className,
                           label,
                           error,
                           inputProps = {},
                           required,
                           icon,
                           children,
                       }: SelectProps & { children: ReactNode }) => {
    const autoId = useId();
    const { id = autoId, ...restInputProps } = inputProps;
    const errorId = `${id}-error`;

    return (
        <div className={clsx(className, 'relative focus-within:text-primary')}>
            <label htmlFor={id} className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'>
                {label}
                {required && <span className='text-red'>*</span>}
            </label>

            <div className='relative'>
                <select
                    id={id}
                    aria-describedby={error ? errorId : undefined}
                    className='w-full placeholder-stroke rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 pr-12 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary appearance-none'
                    {...restInputProps}
                >
                    {children}
                </select>
                <span className='absolute right-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none'>{icon}</span>
            </div>

            {error && (
                <div id={errorId} className='mt-1 text-red-400 text-sm'>
                    {error}
                </div>
            )}
        </div>
    );
};
