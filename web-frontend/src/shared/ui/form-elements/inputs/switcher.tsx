'use client';

import { forwardRef, useEffect, useState } from 'react';
import { BaseInputProps } from '../types';

interface SwitcherProps extends BaseInputProps {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
    name?: string;
}

export const Switcher = forwardRef<HTMLInputElement, SwitcherProps>(
    ({ label, value, defaultValue, onChange, name, ...props }, ref) => {
        const [enabled, setEnabled] = useState<boolean>(defaultValue || false);

        useEffect(() => {
            if (value !== undefined) {
                setEnabled(value);
            }
        }, [value]);

        const handleChange = (newValue: boolean) => {
            setEnabled(newValue);
            if (onChange) {
                onChange(newValue);
            }
        };

        return (
            <div className='flex items-center gap-4'>
                {label && <label className='block text-body-sm font-regular text-gray-6 dark:text-white'>{label}</label>}
                <label htmlFor={name || 'toggle1'} className='flex cursor-pointer select-none items-center'>
                    <div className='relative'>
                        <input
                            type='checkbox'
                            id={name || 'toggle1'}
                            name={name}
                            className='sr-only'
                            checked={enabled}
                            onChange={() => handleChange(!enabled)}
                            ref={ref}
                            {...props}
                        />
                        <div className='block h-8 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]'></div>
                        <div
                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-switch-1 transition ${
                                enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
                            }`}
                        ></div>
                    </div>
                </label>
            </div>
        );
    }
);

Switcher.displayName = 'Switcher';
