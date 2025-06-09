'use client';

import { ExpenseCategoryForm } from '../../ui/shared-form';
import { useEditExpenseCategoryMutation, useGetExpenseCategoryByIdQuery } from '../model/expense-category-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { ExpenseCategorySchema } from '@/features/expense-category/lib/expense-category-schema';
import { Loader } from '@/shared/ui';

export const EditExpenseCategoryForm = ({ expenseCategoryId }: { expenseCategoryId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: expenseCategoryToEdit, isLoading } = useGetExpenseCategoryByIdQuery(expenseCategoryId);

    const { mutate: edit, isPending } = useEditExpenseCategoryMutation(expenseCategoryId);
    if (!expenseCategoryId) {
        toast.error(errorNotifications.staffNotfound);
        return null;
    }
    const onSubmit = (data: ExpenseCategorySchema) => {
        edit(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['expenseCategories'] });
                queryClient.invalidateQueries({ queryKey: ['expenseCategory'] });
                toast.success(successNotifications.saved);
                router.replace(ROUTES.expenseCategories);
            },
            onError: (error: Error) => {
                if ((error as any)?.response?.data?.message?.includes('already exist')) {
                    toast.error(errorNotifications.expenseCategoryAlreadyExists);
                } else {
                    toast.error(errorNotifications.notSaved);
                }
            },
        });
    };

    if (isLoading) {
        return <Loader />;
    }
    if (expenseCategoryId) {
        return (
            <ExpenseCategoryForm
                defaultValues={{
                    name: expenseCategoryToEdit?.name,
                    description: expenseCategoryToEdit?.description,
                }}
                onSubmit={onSubmit}
                isLoading={isPending}
                buttonText={buttons.save}
            />
        );
    }
};
