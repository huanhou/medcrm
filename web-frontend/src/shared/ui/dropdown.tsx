'use client';

import { useState, ReactNode } from 'react';
import { ClickOutside } from './click-outside';
import { Button, ButtonProps } from './buttons/Button';

export interface DropdownItem {
    icon?: ReactNode;
    label: string;
    onClick: () => void;
    value?: string;
}

export interface DropdownOption {
    icon?: ReactNode;
    label: string;
    value: string;
}

export interface DropdownProps {
    items?: DropdownItem[];
    options?: DropdownOption[];
    onValueChange?: (value: string) => void;
    value?: string;
    trigger?: ReactNode;
    buttonProps?: Omit<ButtonProps, 'children'>;
    position?: 'left' | 'right';
    width?: string;
    className?: string;
}

export const Dropdown = ({
                             items,
                             options,
                             onValueChange,
                             value,
                             trigger,
                             buttonProps = { variant: 'ghost', size: 'icon' },
                             position = 'right',
                             width = 'w-48',
                             className = '',
                         }: DropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

    const getTriggerLabel = (): ReactNode => {
        if (trigger) return trigger;

        if (options && selectedValue) {
            const selected = options.find((opt) => opt.value === selectedValue);
            if (selected) return selected.label;
        }

        return defaultTrigger;
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const defaultTrigger = (
        <svg
            className='fill-current'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z'
                fill=''
            />
            <path
                d='M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z'
                fill=''
            />
            <path
                d='M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z'
                fill=''
            />
        </svg>
    );

    return (
        <ClickOutside onClick={closeDropdown} className={className}>
            <div className='relative'>
                <Button {...buttonProps} onClick={toggleDropdown}>
                    {getTriggerLabel()}
                </Button>

                {dropdownOpen && (
                    <div
                        className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} top-full z-40 ${width} space-y-1.5 rounded-[7px] border border-stroke bg-white p-2 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card mt-1`}
                    >
                        {items &&
                            items.map((item, index) => (
                                <button
                                    key={index}
                                    className='flex w-full items-center gap-2 rounded-lg px-2.5 py-[9px] text-left font-medium text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white'
                                    onClick={() => {
                                        item.onClick();
                                        closeDropdown();
                                    }}
                                >
                                    {item.icon && item.icon}
                                    {item.label}
                                </button>
                            ))}

                        {options &&
                            options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-[9px] text-left font-medium ${selectedValue === option.value ? 'bg-gray-2 text-dark dark:bg-dark-3 dark:text-white' : 'text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white'}`}
                                    onClick={() => {
                                        setSelectedValue(option.value);
                                        if (onValueChange) {
                                            onValueChange(option.value);
                                        }
                                        closeDropdown();
                                    }}
                                >
                                    {option.icon && option.icon}
                                    {option.label}
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </ClickOutside>
    );
};
