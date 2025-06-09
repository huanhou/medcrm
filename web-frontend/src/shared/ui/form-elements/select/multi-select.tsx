'use client';

import { HTMLProps, useId } from 'react';
import { useState, useEffect, useRef, FC } from 'react';
import { clsx } from 'clsx';
import { InputProps } from '../types';

export interface MultiSelectOption {
    id: string;
    label: string;
    disabled?: boolean;
}

interface MultiSelectProps extends Omit<InputProps, 'inputProps'> {
    options: MultiSelectOption[];
    onChange?: (selectedIds: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    maxSelectedItems?: number;
    inputProps?: HTMLProps<HTMLInputElement>;
}

export const MultiSelect: FC<MultiSelectProps> = ({
                                                      options,
                                                      onChange,
                                                      placeholder = '',
                                                      label,
                                                      disabled = false,
                                                      maxSelectedItems,
                                                      error,
                                                      required,
                                                      className,
                                                      inputProps = {},
                                                      icon,
                                                  }) => {
    const autoId = useId();
    const { id = autoId, ...restInputProps } = inputProps;
    const errorId = `${id}-error`;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputProps.value && Array.isArray(inputProps.value)) {
            const numericValue = (inputProps.value as string[]).map(String);

            const initialSelected = options.filter((option) => numericValue.includes(option.id));

            setSelectedOptions(initialSelected);
        }
    }, [inputProps.value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                triggerRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (onChange) {
            onChange(selectedOptions.map((option) => option.id));
        }
    }, [selectedOptions, onChange]);

    const toggleOption = (option: MultiSelectOption) => {
        if (disabled || option.disabled) return;

        const isAlreadySelected = selectedOptions.some((selectedOption) => selectedOption.id === option.id);

        if (isAlreadySelected) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id));
        } else {
            if (maxSelectedItems && selectedOptions.length >= maxSelectedItems) {
                return;
            }
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const removeOption = (optionToRemove: MultiSelectOption) => {
        if (disabled) return;

        setSelectedOptions(selectedOptions.filter((option) => option.id !== optionToRemove.id));
    };

    return (
        <div className={clsx(className, 'relative w-full')}>
            <label className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'>
                {label}
                {required && <span className='text-red'>*</span>}
            </label>

            <div
                ref={triggerRef}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={clsx(
                    'relative w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 pr-12 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary',
                    {
                        'border-red-400': error,
                        'border-gray-300': !disabled && !error,
                        'border-gray-200 bg-gray-100 cursor-not-allowed': disabled,
                    }
                )}
            >
                <input
                    id={id}
                    type='hidden'
                    aria-describedby={error ? errorId : undefined}
                    value={selectedOptions.map((option) => option.id).join(',')}
                    {...restInputProps}
                    className='hidden'
                />

                <div className='flex flex-wrap gap-2'>
                    {selectedOptions.length === 0 ? (
                        <span className='text-dark-6'>{placeholder}</span>
                    ) : (
                        selectedOptions.map((option) => (
                            <div key={option.id} className='flex items-center bg-gray-2 rounded-[5px] px-2 py-1 text-body-sm'>
                                <span className='mr-2'>{option.label}</span>
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeOption(option);
                                    }}
                                    className='text-red-500 hover:text-red-700'
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <span className='absolute right-4 top-1/2 -translate-y-1/2 transition-colors'>
          {icon || (
              <svg
                  className='fill-current text-dark-6'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
              >
                  <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z'
                      fill=''
                  />
              </svg>
          )}
        </span>
            </div>

            {error && (
                <div id={errorId} className='mt-1 text-red-400 text-sm'>
                    {error}
                </div>
            )}

            {isOpen && !disabled && (
                <div
                    ref={dropdownRef}
                    className='absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border dark:bg-dark-2 dark:border-dark-3'
                >
                    <div className='max-h-60 overflow-auto'>
                        {options.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => toggleOption(option)}
                                className={clsx('px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-3', {
                                    'bg-primary/5': selectedOptions.some((selectedOption) => selectedOption.id === option.id),
                                    'text-dark-6 cursor-not-allowed': option.disabled,
                                })}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
