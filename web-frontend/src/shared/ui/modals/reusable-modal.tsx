import { ClickOutside } from '../click-outside';
import { FC } from 'react';
import { useDictionary } from '@/shared/lib/hooks';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export const ReusableModal: FC<ModalProps> = ({ isOpen, onClose, title, message, onConfirm }) => {
    const { dictionary } = useDictionary();
    const { buttons } = dictionary;
    return (
        <>
            {isOpen && (
                <div
                    className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-[#111928]/90 px-4 py-5`}
                >
                    <ClickOutside onClick={onClose}>
                        <div className='w-full max-w-[550px] rounded-[15px] bg-white px-8 py-13.5 text-center shadow-3 dark:bg-gray-dark dark:shadow-card md:px-15 md:py-15'>
                            <h3 className='text-xl font-bold text-dark dark:text-white sm:text-2xl'>{title}</h3>
                            <hr className='border-t border-2 rounded border-red w-[90px] mx-auto mt-5 mb-5.5' />
                            <p className='mb-10 font-medium'>{message}</p>
                            <div className='-mx-2.5 flex flex-wrap gap-y-4'>
                                <div className='w-full px-2.5 2xsm:w-1/2'>
                                    <button
                                        onClick={onClose}
                                        className='block w-full rounded-[7px] border border-stroke bg-gray-2 p-[11px] text-center font-medium text-dark transition hover:border-gray-3 hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:border-dark-4 dark:hover:bg-dark-4'
                                    >
                                        {buttons.cancel}
                                    </button>
                                </div>
                                <div className='w-full px-3 2xsm:w-1/2'>
                                    <button
                                        onClick={onConfirm}
                                        className='block w-full rounded-[7px] border border-red bg-red p-[11px] text-center font-medium text-white transition hover:bg-opacity-90'
                                    >
                                        {buttons.confirm}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ClickOutside>
                </div>
            )}
        </>
    );
};
