'use client';

import { ImageUpload } from '@/shared/ui';
import Image from 'next/image';
import { useSettingsForm } from '../model/use-settings-form';
import { useState, useEffect } from 'react';
import { useEditSettings } from '../model/api';
import { Button } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';

export const LogoForm = () => {
    const { data } = useSettingsForm();
    const { dictionary } = useDictionary();
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [originalLogo, setOriginalLogo] = useState<string | null>(null);
    const [imageError, setImageError] = useState<boolean>(false);

    const fallbackLogoUrl = '/assets/logo/logo.svg';

    useEffect(() => {
        if (data?.logo && !originalLogo) {
            setOriginalLogo(data.logo);
        }
    }, [data?.logo, originalLogo]);

    const handleImageChange = (file: File | null) => {
        if (file) {
            setLogoFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setIsChanged(true);
            setImageError(false);
        } else {
            setLogoFile(null);
            setPreviewUrl(null);
            setIsChanged(originalLogo !== null);
            setImageError(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (logoFile) {
            const formData = new FormData();
            formData.append('file', logoFile)
            setIsChanged(false);
            setOriginalLogo(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const logoUrl = previewUrl || (imageError ? fallbackLogoUrl : data?.logo || fallbackLogoUrl);

    const isSaveButtonDisabled =  !isChanged || (!logoFile && !data?.logo);

    const handleImageError = () => {
        console.error('Ошибка загрузки изображения:', data?.logo);
        setImageError(true);
    };

    return (
        <div className='col-span-5 xl:col-span-2'>
            <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
                <div className='border-b border-stroke px-7 py-4 dark:border-dark-3 flex justify-between items-center'>
                    <h3 className='font-medium text-dark dark:text-white'>{dictionary.settings.logo.title || 'Логотип'}</h3>
                    {isChanged && <span className='text-sm text-amber-500 animate-pulse'>* {dictionary.unsavedChanges}</span>}
                </div>
                <div className='p-7'>
                    <form onSubmit={onSubmit}>
                        <div className='mb-4 flex items-center gap-3'>
                            <div className='h-14 w-14 rounded-full overflow-hidden'>
                                <Image
                                    src={logoUrl}
                                    width={55}
                                    height={55}
                                    alt='Logo'
                                    className='overflow-hidden rounded-full object-cover'
                                    onError={handleImageError}
                                    unoptimized={logoUrl.startsWith('http')}
                                />
                            </div>
                            <div>
                                <span className='mb-1.5 font-medium text-dark dark:text-white'>{dictionary.settings.logo.upload}</span>
                                {imageError && data?.logo && (
                                    <p className='text-xs text-red-500'>
                                        Не удалось загрузить изображение с сервера. Используется запасное изображение.
                                    </p>
                                )}
                            </div>
                        </div>

                        <ImageUpload onChange={handleImageChange} />

                        <div className='flex justify-end gap-3 mt-5'>
                            <Button
                                className='rounded-[7px]'
                                type='button'
                                variant='outlined'
                                onClick={() => {
                                    handleImageChange(null);
                                    setIsChanged(false);
                                }}
                            >
                                {dictionary.sharedForm.buttonText.cancel}
                            </Button>
                            <Button
                                className={`rounded-[7px] transition-all duration-300 ${
                                    !isChanged ? 'opacity-60 cursor-not-allowed' : 'shadow-md hover:shadow-lg'
                                }`}
                                type='submit'
                                disabled={isSaveButtonDisabled}

                                variant={isChanged ? 'primary' : 'outlined'}
                            >
                                {dictionary.sharedForm.buttonText.save}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
