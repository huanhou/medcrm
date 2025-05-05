'use client';

import { FC, ReactNode } from 'react';
import { DictionaryPages } from '@/shared/types/dictionary';
import { useDictionary } from '@/shared/lib/hooks';
import { Logo } from '@/shared/ui';
interface UiFormPageLayoutProps {
    form: ReactNode;
    pageName: DictionaryPages;
}

export const UiFormPageLayout: FC<UiFormPageLayoutProps> = ({ form, pageName }) => {
    const { dictionary } = useDictionary();

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-light flex-col'>
            <div className='absolute top-3 left-2'>
                <Logo />
            </div>
            <main className='px-11.5 gap-6 lg:w-[518px] lg:min-h-[492px] bg-white rounded-[8px] border border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card flex flex-col'>
                <div className='flex flex-col justify-center py-10'>
                    <p className='text-center text-3xl font-bold text-black'>{dictionary.pages[pageName]}</p>
                    <hr className='border-t border-2 rounded border-primary w-[90px] self-center mt-6 mb-10' />
                    {form}
                </div>
            </main>
        </div>
    );
};
