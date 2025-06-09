import { useId } from 'react';
import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';
import { BaseInputProps } from '../types';

interface TextAreaProps extends BaseInputProps {
    textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TextArea = ({ className, label, error, textAreaProps = {}, required, icon }: TextAreaProps) => {
    const autoId = useId();
    const { id = autoId, rows = 6, ...restTextAreaProps } = textAreaProps;
    const errorId = `${id}-error`;

    return (
        <div className={clsx(className, 'relative focus-within:text-primary')}>
            {label && (
                <label className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'>
                    {label}
                    {required && <span className='text-red'>*</span>}
                </label>
            )}

            <div className='relative'>
        <textarea
            id={id}
            rows={rows}
            aria-describedby={error ? errorId : undefined}
            className='w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
            {...restTextAreaProps}
        />
                {icon && <span className='absolute right-4 top-4 transition-colors'>{icon}</span>}
            </div>

            {error && (
                <div id={errorId} className='mt-1 text-red-400 text-sm'>
                    {error}
                </div>
            )}
        </div>
    );
};
