'use client';

import { UiLayout, Input, Button, Switcher, TextArea } from '@/shared/ui';
import { ServiceSchema } from '../lib/services-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useServiceForm } from '../model/use-service-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

interface ServiceFormProps {
    defaultValues: Partial<ServiceSchema>;
    onSubmit: (data: ServiceSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const ServiceForm = ({ defaultValues, onSubmit, buttonText, isLoading }: ServiceFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register, setValue } = useServiceForm({
        defaultValues,
        onSubmit,
    });
    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.services);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editPermission : pages.createPermission}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                {/* В процеессе */}
                {/* <Dropdown
          options={periodOptions}
          value={period}
          onValueChange={handlePeriodChange}
          buttonProps={{
            variant: 'stroke',
            size: 'medium',
            startIcon: <AdjustmentsHorizontalIcon className='w-5 h-5' />,
            className: 'rounded-lg',
          }}
          width='w-40'
          trigger={
            <span className='text-sm font-medium'>
              {periodOptions.find((option) => option.value === period)?.label}
            </span>
          }
        /> */}
                <Input
                    label={sharedForm.labels.default}
                    inputProps={{
                        ...register('name'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.default,
                        defaultValue: defaultValues.name,
                    }}
                    error={errors.name?.message}
                />
                <TextArea
                    label={sharedForm.labels.description}
                    textAreaProps={{
                        ...register('description'),
                        rows: 4,
                        placeholder: sharedForm.placeholders.description,
                        defaultValue: defaultValues.description,
                    }}
                    error={errors.description?.message}
                />
                <Input
                    label={sharedForm.labels.price}
                    inputProps={{
                        ...register('price'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.price,
                        defaultValue: defaultValues.price || 0,
                    }}
                    error={errors.price?.message}
                />
                <div>
                    <Switcher
                        label={sharedForm.labels.isActive}
                        {...register('is_active')}
                        defaultValue={defaultValues.is_active}
                        onChange={(newValue) => {
                            setValue('is_active', newValue, { shouldDirty: true });
                        }}
                    />
                </div>

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
