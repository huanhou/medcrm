'use client';

import { UiLayout, Input, Button } from '@/shared/ui';
import { ExpenseCategorySchema } from '../lib/expense-category-schema';
import { useUnsavedChanges } from '@/shared/lib/hooks';
import { useExpenseCategoryForm } from '../model/use-expense-category-form';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

interface ExpenseCategoryFormProps {
    defaultValues: Partial<ExpenseCategorySchema>;
    onSubmit: (data: ExpenseCategorySchema) => void;
    buttonText: string;
    isLoading: boolean;
}

export const ExpenseCategoryForm = ({ defaultValues, onSubmit, buttonText, isLoading }: ExpenseCategoryFormProps) => {
    const { handleSubmit, errors, isDirty, isFormSaved, dictionary, register } = useExpenseCategoryForm({
        defaultValues,
        onSubmit,
    });
    const router = useRouter();
    const { sharedForm, pages } = dictionary;
    const shouldPreventNavigation = () => isDirty && !isFormSaved;
    useUnsavedChanges({ isDirty, isFormSaved, shouldPreventNavigation });

    const handleNavigateAway = () => {
        router.push(ROUTES.expenseCategories);
    };

    return (
        <UiLayout>
            <div className='border-b border-stroke px-6.5 py-4 dark:border-dark-3'>
                <h1>{buttonText === sharedForm.buttonText.save ? pages.editExpenseCategory : pages.createExpenseCategory}</h1>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4 p-3.5'>
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
                <Input
                    label={sharedForm.labels.description}
                    inputProps={{
                        ...register('description'),
                        type: 'text',
                        placeholder: sharedForm.placeholders.description,
                        defaultValue: defaultValues.description,
                    }}
                    error={errors.name?.message}
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
