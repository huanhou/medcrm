import clsx from 'clsx';
import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

type UIButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link' | 'outlined' | 'ghost' | 'stroke';

type ButtonSize = 'small' | 'medium' | 'large' | 'icon';

export type ButtonProps = {
    variant: UIButtonVariant;
    size?: ButtonSize;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size = 'medium', startIcon, endIcon, children, isLoading = false, ...props }, ref) => {
        const isIconOnly = size === 'icon' && !children;

        return (
            <button
                {...props}
                ref={ref}
                className={clsx(
                    className,
                    'inline-flex border px-6 py-[11px] font-medium  items-center justify-center',
                    {
                        'px-3 py-1 text-sm': size === 'small',
                        'px-4 py-2 text-base': size === 'medium',
                        'px-5 py-3 text-lg': size === 'large',
                        'w-10 h-10 p-0': isIconOnly,

                        primary:
                            'text-white border-primary bg-primary hover:border-primary hover:bg-primary hover:text-white dark:hover:border-primary disabled:opacity-50',
                        secondary: 'border border-gray-6 text-black',
                        tertiary: 'bg-lime-600 text-white hover:bg-lime-700 shadow-md shadow-lime-600/50 disabled:opacity-50',
                        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/50 disabled:opacity-50',
                        link: 'bg-transparent text-blue-500 hover:underline disabled:opacity-50',
                        outlined: 'border border-gray-6  text-gray-6  disabled:opacity-50',
                        ghost: 'bg-transparent text-blue-500 hover:bg-blue-100 disabled:opacity-50',
                        stroke: 'border border-stroke text-dark-4 disabled:opacity-50 hover:bg-stroke',
                    }[variant]
                )}
                disabled={isLoading || props.disabled}
            >
                {isLoading && (
                    <span className='loader border-2 border-current border-t-transparent rounded-full w-4 h-4 mr-2 animate-spin'></span>
                )}

                {startIcon && !isLoading && (
                    <span
                        className={clsx('inline-flex items-center', {
                            'mr-2': children && !isIconOnly,
                        })}
                    >
            {startIcon}
          </span>
                )}

                {children}

                {endIcon && !isLoading && (
                    <span
                        className={clsx('inline-flex items-center', {
                            'ml-2': children && !isIconOnly,
                        })}
                    >
            {endIcon}
          </span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
