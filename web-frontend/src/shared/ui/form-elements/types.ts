import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export interface BaseInputProps {
    className?: string;
    label?: string;
    error?: string;
    required?: boolean;
    icon?: ReactNode;
}

export interface InputProps extends BaseInputProps {
    inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export interface SelectProps extends BaseInputProps {
    inputProps?: SelectHTMLAttributes<HTMLSelectElement>;
    children: ReactNode;
}

export interface SearchSelectOption {
    id: string;
    label: string;
    disabled?: boolean;
}

export interface SearchSelectProps extends BaseInputProps {
    options: SearchSelectOption[];
    onChange?: (selectedId: string, selectedOption: SearchSelectOption) => void;
    onClear?: () => void;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
