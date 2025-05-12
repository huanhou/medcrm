'use client';

import { HTMLProps, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export function Checkbox({
                             indeterminate,
                             className = '',
                             id,
                             ...rest
                         }: {
    indeterminate?: boolean;
    id?: string;
} & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);
    const [mounted, setMounted] = useState(false);
    const [checkboxId, setCheckboxId] = useState<string>('');

    useEffect(() => {
        setMounted(true);
        setCheckboxId(id || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
    }, [id]);

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate, rest.checked]);

    if (!mounted) {
        return (
            <label
                htmlFor={id || 'checkbox-placeholder'}
                className={clsx('flex cursor-pointer select-none items-center font-medium', className)}
            >
                <div className='relative'>
                    <input
                        id={id || 'checkbox-placeholder'}
                        type='checkbox'
                        ref={ref}
                        {...rest}
                        className={clsx('tableCheckbox sr-only', className)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className='box mr-4 flex h-4 w-4 items-center justify-center rounded-[3px] border border-stroke text-white dark:border-dark-3'>
            <span className='opacity-0'>
              <svg
                  className='fill-current'
                  width='8'
                  height='7'
                  viewBox='0 0 8 7'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
              >
                <path
                    d='M7.6917 0.242523C8.07198 0.593634 8.10501 1.19705 7.76547 1.59029L3.36988 6.6812C3.19475 6.88403 2.94427 7 2.68132 7C2.41837 7 2.1679 6.88403 1.99277 6.6812L0.234528 4.64484C-0.105007 4.25159 -0.0719774 3.64817 0.308302 3.29706C0.688581 2.94595 1.2721 2.98011 1.61164 3.37335L2.68132 4.61224L6.38836 0.318812C6.72789 -0.0744316 7.31142 -0.108587 7.6917 0.242523Z'
                    fill=''
                />
              </svg>
            </span>
                    </div>
                </div>
            </label>
        );
    }

    return (
        <label htmlFor={checkboxId} className={clsx('flex cursor-pointer select-none items-center font-medium', className)}>
            <div className='relative'>
                <input
                    id={checkboxId}
                    type='checkbox'
                    ref={ref}
                    {...rest}
                    className={clsx('tableCheckbox sr-only', className)}
                    onClick={(e) => e.stopPropagation()}
                />
                <div className='box mr-4 flex h-4 w-4 items-center justify-center rounded-[3px] border border-stroke text-white dark:border-dark-3'>
          <span className={rest.checked || indeterminate ? 'opacity-100' : 'opacity-0'}>
            <svg
                className='fill-current'
                width='8'
                height='7'
                viewBox='0 0 8 7'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
              <path
                  d='M7.6917 0.242523C8.07198 0.593634 8.10501 1.19705 7.76547 1.59029L3.36988 6.6812C3.19475 6.88403 2.94427 7 2.68132 7C2.41837 7 2.1679 6.88403 1.99277 6.6812L0.234528 4.64484C-0.105007 4.25159 -0.0719774 3.64817 0.308302 3.29706C0.688581 2.94595 1.2721 2.98011 1.61164 3.37335L2.68132 4.61224L6.38836 0.318812C6.72789 -0.0744316 7.31142 -0.108587 7.6917 0.242523Z'
                  fill=''
              />
            </svg>
          </span>
                </div>
            </div>
        </label>
    );
}
