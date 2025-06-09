'use client';

import { useId } from 'react';
import { useState, useEffect, useRef, FC } from 'react';
import { clsx } from 'clsx';
import { SearchSelectOption, SearchSelectProps } from '../types';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

export const SearchSelect: FC<SearchSelectProps> = ({
                                                        options,
                                                        onChange,
                                                        onClear,
                                                        placeholder = '',
                                                        label,
                                                        disabled = false,
                                                        value,
                                                        error,
                                                        required,
                                                        className,
                                                        inputProps = {},
                                                        icon = <ChevronDownIcon className='h-5 w-5' />,
                                                    }) => {
    const autoId = useId();
    const { id = autoId, ...restInputProps } = inputProps;
    const errorId = `${id}-error`;

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<SearchSelectOption | null>(
        options.find((option) => option.id === value) || null
    );

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchValue('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value !== undefined) {
            const option = options.find((opt) => opt.id === value);
            setSelectedOption(option || null);
        }
    }, [value, options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const handleOptionSelect = (option: SearchSelectOption) => {
        if (option.disabled) return;

        setSelectedOption(option);
        onChange?.(option.id, option);
        setIsOpen(false);
        setSearchValue('');
    };

    const handleClear = () => {
        setSelectedOption(null);
        setSearchValue('');
        onClear?.();
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            inputRef.current?.focus();
        }
    };

    return (
        <div className={clsx(className, 'relative focus-within:text-gray-6 w-full')} ref={dropdownRef}>
            <label htmlFor={id} className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'>
                {label}
                {required && <span className='text-red'>*</span>}
            </label>

            <div className='relative'>
                <div
                    className={clsx(
                        'flex items-center w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus-within:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white',
                        disabled && 'opacity-60 cursor-not-allowed'
                    )}
                    onClick={!disabled ? toggleDropdown : undefined}
                >
                    <input
                        ref={inputRef}
                        id={id}
                        type='text'
                        className='bg-transparent border-none outline-none w-full text-dark dark:text-white placeholder:text-dark-6'
                        placeholder={selectedOption ? selectedOption.label : placeholder}
                        value={isOpen ? searchValue : selectedOption?.label || ''}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        disabled={disabled}
                        aria-describedby={error ? errorId : undefined}
                        {...restInputProps}
                    />
                    <div className='flex items-center'>
                        {selectedOption && searchValue === '' && !isOpen && (
                            <button
                                type='button'
                                className='mr-2 text-dark-6 hover:text-dark'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                            >
                                &times;
                            </button>
                        )}
                        <span
                            className='transition-transform duration-200'
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
              {icon}
            </span>
                    </div>
                </div>

                {isOpen && (
                    <div className='absolute z-50 w-full mt-1 bg-white dark:bg-dark-2 border border-stroke dark:border-dark-3 rounded-md shadow-lg max-h-60 overflow-auto'>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={clsx(
                                        'px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-1',
                                        option.id === selectedOption?.id && 'bg-primary/10 text-primary',
                                        option.disabled && 'opacity-50 cursor-not-allowed'
                                    )}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <span>{option.label}</span>
                                    {option.id === selectedOption?.id && <CheckIcon className='h-4 w-4' />}
                                </div>
                            ))
                        ) : (
                            <div className='px-4 py-2 text-gray-500 dark:text-gray-400'>Ничего не найдено</div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div id={errorId} className='mt-1 text-red-400 text-sm'>
                    {error}
                </div>
            )}
        </div>
    );
};
