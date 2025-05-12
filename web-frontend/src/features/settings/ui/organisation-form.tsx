'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { Button, Input, PhoneInput, Select } from '@/shared/ui';
import { useDictionary } from '@/shared/lib/hooks';

type FormData = {
    organization_name: string;
    phone: string;
    iin_bin: string;
    legal_address: string;
    director: string;
    bio: string;
};

export const OrganisationForm = () => {
    const { dictionary } = useDictionary();

    const {
        register,
        handleSubmit,
        formState: { isDirty, isSubmitting, errors },
        reset,
        setValue,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            organization_name: '',
            phone: '',
            iin_bin: '',
            legal_address: '',
            director: '',
            bio: '',
        },
    });

    const registerWithMask = useHookFormMask(register);

    const onSubmit = (data: FormData) => {
        alert('Форма сохранена (только на клиенте)');
        reset(data);
    };

    return (
        <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
                <div className='border-b border-stroke px-7 py-4 dark:border-dark-3 flex justify-between items-center'>
                    <h3 className='font-medium text-dark dark:text-white'>{dictionary.settings.title}</h3>
                    {isDirty && (
                        <span className='text-sm text-amber-500 animate-pulse'>* {dictionary.unsavedChanges}</span>
                    )}
                </div>

                <div className='p-7'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                            <Input
                                className='w-full'
                                label={dictionary.settings.organisation.name}
                                inputProps={{
                                    ...register('organization_name'),
                                    placeholder: dictionary.settings.organisation.name,
                                }}
                                error={errors.organization_name?.message}
                            />

                            <PhoneInput
                                label={dictionary.settings.organisation.phone}
                                name='phone'
                                className='mb-4.5 w-full'
                                placeholder={dictionary.settings.organisation.phone}
                                registerWithMask={registerWithMask}
                                error={errors.phone?.message}
                            />
                        </div>

                        <Input
                            className='mb-5.5 w-full'
                            label={dictionary.settings.organisation.iin_bin}
                            inputProps={{
                                ...register('iin_bin'),
                                placeholder: dictionary.settings.organisation.iin_bin,
                            }}
                            error={errors.iin_bin?.message}
                        />

                        <Input
                            className='mb-5.5 w-full'
                            label={dictionary.settings.organisation.legal_address}
                            inputProps={{
                                ...register('legal_address'),
                                placeholder: dictionary.settings.organisation.legal_address,
                            }}
                            error={errors.legal_address?.message}
                        />

                        <Select
                            className='mb-5.5 w-full'
                            label={dictionary.settings.organisation.director}
                            inputProps={{
                                ...register('director'),
                            }}
                            error={errors.director?.message}
                            icon={
                                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M4 6L8 10L12 6'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            }
                        >
                            <option value=''>Выберите директора</option>
                            <option value='1'>Иванов Иван</option>
                            <option value='2'>Сидорова Анна</option>
                        </Select>

                        <div className='mb-5.5'>
                            <label
                                className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white'
                                htmlFor='bio'
                            >
                                {dictionary.settings.organisation.bio}
                            </label>
                            <textarea
                                className='w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
                                id='bio'
                                rows={6}
                                placeholder={dictionary.settings.organisation.bio}
                                {...register('bio')}
                            ></textarea>
                            {errors.bio?.message && (
                                <div className='mt-1 text-red-400 text-sm'>{errors.bio.message}</div>
                            )}
                        </div>

                        <div className='flex justify-end gap-3'>
                            <Button
                                className={`rounded-[7px] transition-all duration-300 ${
                                    !isDirty ? 'opacity-60 cursor-not-allowed' : 'shadow-md hover:shadow-lg'
                                }`}
                                type='submit'
                                disabled={!isDirty}
                                isLoading={isSubmitting}
                                variant={isDirty ? 'primary' : 'outlined'}
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
