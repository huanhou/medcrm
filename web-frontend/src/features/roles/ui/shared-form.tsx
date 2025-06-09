'use client';

import { UiLayout, Input, Button, MultiSelect } from '@/shared/ui';
import { RolesSchema } from '../lib/roles-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useRoleForm } from '../model/use-role-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

interface StaffFormProps {
    defaultValues: Partial<RolesSchema>;
    onSubmit: (data: RolesSchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const RoleForm = ({ defaultValues, onSubmit, buttonText, isLoading }: StaffFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register, permission, setValue } = useRoleForm({
        defaultValues,
        onSubmit,
    });
    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.roles);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editRole : pages.createRole}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
                <Input
                    label={sharedForm.labels.role}
                    inputProps={{
                        ...register('roleName'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.role,
                    }}
                    error={errors.roleName?.message}
                />
                <MultiSelect
                    options={permission?? []}
                    onChange={(ids) => {
                        setValue('permission', ids);
                    }}
                    label={sharedForm.labels.permission}
                    placeholder={sharedForm.placeholders.default}
                    inputProps={{
                        ...register('permission'),
                        type: 'text',
                        value: defaultValues.permission?.map(String),
                    }}
                    error={errors.permission?.message}
                />

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
