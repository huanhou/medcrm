import { DictionaryType } from "@/shared/config/i18n";

export type PeriodOption = {
    label: string;
    value: string;
};

export function usePeriodOptions(dictionary: DictionaryType, isAnnual?: boolean): PeriodOption[] {
    if (isAnnual) {
        return [
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' },
            { label: '2026', value: '2026' },
            { label: '2027', value: '2027' }
        ];
    }

    return [
        { label: dictionary.periodOptions.daily, value: 'daily' },
        { label: dictionary.periodOptions.weekly, value: 'weekly' },
        { label: dictionary.periodOptions.monthly, value: 'monthly' },
        { label: dictionary.periodOptions.yearly, value: 'yearly' }
    ];
}