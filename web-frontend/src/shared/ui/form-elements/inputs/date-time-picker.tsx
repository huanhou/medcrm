'use client';

import { useEffect, useRef, useCallback } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import clsx from 'clsx';

interface DateTimePickerProps {
    id?: string;
    className?: string;
    placeholder?: string;
    value?: Date | string;
    onChange?: (date: Date | null) => void;
    enableTime?: boolean;
    dateFormat?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    pastDatesDisabled?: boolean;
    mode?: 'single' | 'range' | 'multiple';
    label?: string;
    error?: string;
}

export function DateTimePicker({
                                   id,
                                   className,
                                   placeholder = 'Select date and time',
                                   value,
                                   onChange,
                                   enableTime = true,
                                   dateFormat = 'Y-m-d H:i',
                                   disabled = false,
                                   minDate,
                                   maxDate,
                                   pastDatesDisabled = false,
                                   mode = 'single',
                                   label,
                                   error,
                                   ...props
                               }: DateTimePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const fpRef = useRef<flatpickr.Instance | null>(null);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const getEffectiveMinDate = useCallback(() => {
        if (pastDatesDisabled && !minDate) {
            return new Date();
        }
        return minDate;
    }, [pastDatesDisabled, minDate]);

    useEffect(() => {
        if (!inputRef.current) return;

        const handleChange = (selectedDates: Date[]) => {
            const date = selectedDates[0] || null;
            if (onChangeRef.current) {
                onChangeRef.current(date);
            }
        };

        const effectiveMinDate = getEffectiveMinDate();

        const fpInstance = flatpickr(inputRef.current, {
            enableTime,
            dateFormat,
            defaultDate: value,
            minDate: effectiveMinDate,
            maxDate,
            mode,
            disableMobile: true,
            onChange: handleChange,
        });

        fpRef.current = fpInstance;

        return () => {
            if (fpRef.current) {
                fpRef.current.destroy();
                fpRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!fpRef.current) return;

        try {
            fpRef.current.set('enableTime', enableTime);

            if (typeof dateFormat === 'string') {
                fpRef.current.set('dateFormat', dateFormat);
            }

            const effectiveMinDate = getEffectiveMinDate();
            if (effectiveMinDate) {
                fpRef.current.set('minDate', effectiveMinDate);
            }

            if (maxDate) {
                fpRef.current.set('maxDate', maxDate);
            }

            if (value) {
                fpRef.current.setDate(value, false);
            }

            if (inputRef.current) {
                inputRef.current.disabled = disabled;
            }
        } catch (error) {
            console.error('Ошибка при обновлении настроек flatpickr:', error);
        }
    }, [enableTime, dateFormat, value, minDate, maxDate, mode, disabled, pastDatesDisabled, getEffectiveMinDate]);

    return (
        <>
            {label && <label className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'>{label}</label>}
            <div className={clsx('relative', className)}>
                <div className='relative'>
                    <input
                        ref={inputRef}
                        id={id}
                        placeholder={placeholder}
                        className='pr-10'
                        disabled={disabled}
                        readOnly
                        {...props}
                    />
                </div>
            </div>
            {error && <p className='mt-1 text-body-sm text-red'>{error}</p>}
        </>
    );
}
