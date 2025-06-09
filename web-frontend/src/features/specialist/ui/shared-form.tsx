'use client';

import {
    UiLayout,
    Input,
    Button,
    Select,
    PhoneInput,
} from '@/shared/ui';
import { SpecialistSchemaType } from '@/features/specialist/model/specialist-schema';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useSpecialistForm } from '../model/use-specialist-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

interface SpecialistFormProps {
    defaultValues: Partial<SpecialistSchemaType>;
    onSubmit: (data: SpecialistSchemaType) => void;
    buttonText: string;
    isLoading: boolean;
}

export const SpecialistForm = ({
                                   defaultValues,
                                   onSubmit,
                                   buttonText,
                                   isLoading,
                               }: SpecialistFormProps) => {
    const {
        handleSubmit,
        register,
        registerWithMask,
        errors,
        isDirty,
        isFormSaved,
        filials,
        statuses,
        dictionary,
    } = useSpecialistForm({
        defaultValues,
        onSubmit,
    });

    const router = useRouter();
    const { sharedForm } = dictionary;

    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.specialists);
    };

    const heading =
        buttonText === sharedForm.buttonText.save
            ? sharedForm.specialistHeading.edit
            : sharedForm.specialistHeading.add;

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{heading}</h1>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>

                <Input
                    label={sharedForm.labels.fullName}
                    inputProps={{
                        ...register('name'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.fullName,
                    }}
                    error={errors.name?.message}
                />

                <PhoneInput
                    label={sharedForm.labels.phoneNumber}
                    registerWithMask={registerWithMask}
                    name='phoneNumber'
                    error={errors.phoneNumber?.message}
                    className='mb-4.5'
                    placeholder={sharedForm.placeholders.phoneNumber}
                />



                <Input
                    label={sharedForm.labels.iin}
                    inputProps={{
                        ...register('iin'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.iin,
                    }}
                    error={errors.iin?.message}
                />

                <Select
                    label={sharedForm.labels.branch}
                    icon={<ChevronDownIcon className='size-6 text-gray-6' />}
                    error={errors.branch?.message}
                    inputProps={{
                        ...register('branch'),
                        defaultValue: defaultValues.branch,
                    }}
                >
                    <option value=''>{sharedForm.placeholders.branch}</option>
                    {filials?.map((filial) => (
                        <option key={filial.id} value={filial.id}>
                            {filial.name}
                        </option>
                    ))}
                </Select>

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

                <div className='flex items-center gap-2'>
                    <input
                        type='checkbox'
                        {...register('specialistType')}
                        id='internal'
                        className='w-4 h-4'
                    />
                    <label htmlFor='internal' className='text-sm text-gray-700'>
                        {sharedForm.labels.internal}
                    </label>
                </div>

                <div className='flex gap-2 items-center ml-auto justify-end'>
                    <Button
                        onClick={handleNavigateAway}
                        className='rounded-[7px]'
                        variant='outlined'
                        type='button'
                    >
                        {sharedForm.buttonText.cancel}
                    </Button>

                    <Button
                        isLoading={isLoading}
                        disabled={isLoading}
                        variant='primary'
                        type='submit'
                        className='rounded-[7px]'
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        </UiLayout>
    );
};