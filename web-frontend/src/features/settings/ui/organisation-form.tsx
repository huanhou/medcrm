'use client';

import { Button, Input, Select, PhoneInput } from '@/shared/ui';
import { useSettingsForm } from '../model/use-settings-form';
import { useDictionary } from '@/shared/lib/hooks';
import { Settings } from '@/shared/api/types';
import { useEffect } from 'react';
import { useHookFormMask } from 'use-mask-input';

export const OrganisationForm = () => {
    const { data, mutate, isPending, handleSubmit, register, errors, staff, setValue, isDirty } = useSettingsForm();
    const { dictionary } = useDictionary();

    const onSubmit = (formData: Settings) => {
        mutate(formData);
    };

    const registerWithMask = useHookFormMask(register);

    useEffect(() => {
        if (data?.director && staff) {
            const directorExists = staff.some((member) => member.id === data.director);
            if (!directorExists) {
                setValue('director', '');
            }
        }
    }, [data?.director, staff, setValue]);

    return (
        <div className='col-span-5 xl:col-span-3'>
            <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card'>
                <div className='border-b border-stroke px-7 py-4 dark:border-dark-3 flex justify-between items-center'>
                    <h3 className='font-medium text-dark dark:text-white'>{dictionary.settings.title}</h3>
                    {isDirty && <span className='text-sm text-amber-500 animate-pulse'>* {dictionary.unsavedChanges}</span>}
                </div>
                <div className='p-7'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
                            <Input
                                className='w-full'
                                label={dictionary.settings.organisation.name}
                                inputProps={{
                                    type: 'text',
                                    id: 'organization_name',
                                    placeholder: dictionary.settings.organisation.name,
                                    ...register('organization_name'),
                                }}
                                error={errors?.organization_name?.message}
                            />
                            <PhoneInput
                                label={dictionary.settings.organisation.phone}
                                name='phone'
                                error={errors?.phone?.message as string}
                                className='mb-4.5 w-full'
                                placeholder={dictionary.settings.organisation.phone}
                                registerWithMask={registerWithMask}
                            />
                        </div>

                        <div className='mb-5.5'>
                            <Input
                                className='w-full'
                                label={dictionary.settings.organisation.iin_bin}
                                inputProps={{
                                    type: 'text',
                                    id: 'iin_bin',
                                    placeholder: dictionary.settings.organisation.iin_bin,
                                    ...register('iin_bin'),
                                }}
                                error={errors?.iin_bin?.message}
                            />
                        </div>

                        <div className='mb-5.5'>
                            <Input
                                className='w-full'
                                label={dictionary.settings.organisation.legal_address}
                                inputProps={{
                                    type: 'text',
                                    id: 'legal_address',
                                    placeholder: dictionary.settings.organisation.legal_address,
                                    ...register('legal_address'),
                                }}
                                error={errors?.legal_address?.message}
                            />
                        </div>

                        <div className='mb-5.5'>
                            <Select
                                className='w-full'
                                label={dictionary.settings.organisation.director}
                                inputProps={{
                                    id: 'director',
                                    ...register('director'),
                                }}
                                error={errors?.director?.message}
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
                                {staff?.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.fio}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className='mb-5.5'>
                            <label className='mb-3 block text-body-sm font-regular text-gray-6 dark:text-white' htmlFor='bio'>
                                {dictionary.settings.organisation.bio}
                            </label>
                            <div>
                <textarea
                    className='w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary'
                    id='bio'
                    rows={6}
                    placeholder={dictionary.settings.organisation.bio}
                    {...register('bio')}
                ></textarea>
                                {errors?.bio?.message && <div className='mt-1 text-red-400 text-sm'>{errors.bio.message}</div>}
                            </div>
                        </div>

                        <div className='flex justify-end gap-3'>
                            <Button
                                className={`rounded-[7px] transition-all duration-300 ${
                                    !isDirty ? 'opacity-60 cursor-not-allowed' : 'shadow-md hover:shadow-lg'
                                }`}
                                type='submit'
                                disabled={isPending || !isDirty}
                                isLoading={isPending}
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
