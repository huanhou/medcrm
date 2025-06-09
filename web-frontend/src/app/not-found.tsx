import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Страница не найдена | med-crm',
    description: 'Страница не найдена',
};

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-full max-w-[575px] p-6'>
                <div className='text-center'>
                    <div className='mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full border border-stroke bg-white shadow-error'>
                        <svg className='h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                        </svg>
                    </div>

                    <h1 className='mb-4 text-4xl font-bold text-gray-900'>Страница не найдена</h1>

                    <p className='mb-8 text-gray-600'>Извините, страница, которую вы ищете, не существует или была перемещена.</p>

                    <Link
                        href='/'
                        className='inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90'
                    >
                        <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                            <path
                                fillRule='evenodd'
                                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span>Вернуться на главную</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
