'use client';

import { UiLayout, Button, Select, Input, PhoneInput } from '@/shared/ui';
import { FilialSchema } from '../lib/filial-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useFilialForm } from '../model/use-filial-form';
import { useHookFormMask } from 'use-mask-input';

interface FilialFormProps {
    defaultValues: Partial<FilialSchema>;
    onSubmit: (data: FilialSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const FilialForm = ({ defaultValues, onSubmit, buttonText, isLoading }: FilialFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register, statuses } = useFilialForm({
        defaultValues,
        onSubmit,
    });

    const registerWithMask = useHookFormMask(register);

    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.filials);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editFilial : pages.createFilial}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Input
                    label={sharedForm.labels.default}
                    error={errors.name?.message}
                    inputProps={{
                        ...register('name'),
                        placeholder: sharedForm.placeholders.default,
                    }}
                />

                <Input
                    label={sharedForm.labels.address}
                    error={errors.address?.message}
                    inputProps={{
                        ...register('address'),
                        placeholder: sharedForm.placeholders.address,
                    }}
                />

                <Input
                    label={sharedForm.labels.email}
                    error={errors.email?.message}
                    inputProps={{
                        ...register('email'),
                        placeholder: sharedForm.placeholders.email,
                    }}
                />

                <PhoneInput
                    label={sharedForm.labels.phoneNumber}
                    registerWithMask={registerWithMask}
                    name='phone'
                    error={errors.phone?.message}
                    className='mb-4.5'
                    placeholder={sharedForm.placeholders.phoneNumber}
                />

                <Select
                    label={sharedForm.labels.status}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    error={errors.status?.message}
                    inputProps={{
                        ...register('status'),
                        defaultValue: defaultValues.status,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.status}</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </Select>

                <div className='flex gap-2 items-center ml-auto justify-end'>
                    <Button onClick={handleNavigateAway} className='rounded-[7px]' variant='outlined' type='button'>
                        {sharedForm.buttonText.cancel}
                    </Button>
                    <Button isLoading={isLoading} disabled={isLoading} variant='primary' type='submit' className='rounded-[7px]'>
                        {buttonText}
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
};
