
'use client';

import { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/flatpickr.css';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface RangeDatePickerProps {
    id?: string;
    className?: string;
    placeholder?: string;
    value?: DateRange;
    onChange?: (range: DateRange) => void;
    enableTime?: boolean;
    dateFormat?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    label?: string;
    error?: string;
    locale?: 'ru' | 'en';
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
}

export function RangeDatePicker({
                                    id,
                                    className,
                                    placeholder = 'Выберите дату',
                                    value,
                                    onChange,
                                    enableTime = false,
                                    dateFormat = 'Y-m-d',
                                    disabled = false,
                                    minDate,
                                    maxDate,
                                    label,
                                    error,
                                    locale = 'ru',
                                    prefixIcon,
                                    suffixIcon,
                                    ...props
                                }: RangeDatePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [flatpickrInstance, setFlatpickrInstance] = useState<flatpickr.Instance | null>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!inputRef.current || initializedRef.current) return;

        const defaultDates = [];
        if (value?.startDate) defaultDates.push(value.startDate);
        if (value?.endDate) defaultDates.push(value.endDate);

        const fp = flatpickr(inputRef.current, {
            enableTime,
            dateFormat,
            defaultDate: defaultDates,
            minDate,
            maxDate,
            mode: 'range',
            locale: locale === 'ru' ? Russian : undefined,
            disableMobile: true,
            onChange: (selectedDates) => {
                if (!onChange) return;

                const range: DateRange = {
                    startDate: selectedDates[0] || null,
                    endDate: selectedDates[1] || null,
                };

                onChange(range);
            },
        });

        setFlatpickrInstance(fp);
        initializedRef.current = true;

        return () => {
            if (fp) {
                fp.destroy();
                initializedRef.current = false;
            }
        };
    }, [dateFormat, enableTime, maxDate, minDate, onChange, value?.endDate, value?.startDate, locale]);

    useEffect(() => {
        if (!flatpickrInstance) return;

        try {
            if (minDate !== undefined) flatpickrInstance.set('minDate', minDate);
            if (maxDate !== undefined) flatpickrInstance.set('maxDate', maxDate);

            const dates = [];
            if (value?.startDate) dates.push(value.startDate);
            if (value?.endDate) dates.push(value.endDate);

            if (dates.length > 0 && flatpickrInstance.selectedDates.length === 0) {
                flatpickrInstance.setDate(dates, false);
            } else if (dates.length === 0 && flatpickrInstance.selectedDates.length > 0) {
                flatpickrInstance.clear(false);
            } else if (dates.length > 0 && flatpickrInstance.selectedDates.length > 0) {
                const currentStart = flatpickrInstance.selectedDates[0]?.getTime();
                const currentEnd = flatpickrInstance.selectedDates[1]?.getTime();
                const newStart = value?.startDate?.getTime();
                const newEnd = value?.endDate?.getTime();

                if (currentStart !== newStart || currentEnd !== newEnd) {
                    flatpickrInstance.setDate(dates, false);
                }
            }
        } catch (error) {
            console.error('Ошибка при обновлении flatpickr:', error);
        }
    }, [flatpickrInstance, minDate, maxDate, value]);

    const handleClearDates = () => {
        if (flatpickrInstance) {
            flatpickrInstance.clear();
            if (onChange) {
                onChange({startDate: null, endDate: null});
            }
        }
    };

    return (
        <>
            {label && (
                <label className="mb-2 block text-xs font-regular text-gray-6 dark:text-white">
                    {label}
                </label>
            )}
            <div className={clsx('relative', className)}>
                <div className="relative">
                    {prefixIcon && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            {prefixIcon}
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        id={id}
                        placeholder={placeholder}
                        className={clsx(
                            'w-[240px] rounded-lg border border-gray-300 bg-primary text-white placeholder:text-white py-3 px-3 text-sm focus:border-primary focus-visible:outline-none',
                            prefixIcon && 'pl-8',
                            (value?.startDate || value?.endDate) && 'pr-8'
                        )}
                        disabled={disabled}
                        readOnly
                        {...props}
                    />
                    {(value?.startDate || value?.endDate) && (
                        <button
                            type="button"
                            onClick={handleClearDates}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label="Очистить даты"
                        >
                            {suffixIcon || <XMarkIcon className="w-4 h-4 text-white"/>}
                        </button>
                    )}
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red">{error}</p>}
        </>
    );
}