'use client';

import { ExpenseForm } from '../../ui/shared-form';
import { useEditExpenseMutation, useGetExpenseByIdQuery } from '../modal/expense-edit-api';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/shared/api/query-client';
import { useDictionary } from '@/shared/lib/hooks';
import { ExpenseSchema } from '@/features/expenses/lib/expenses-schema';
import { Loader } from '@/shared/ui';

export const EditExpenseForm = ({ expenseId }: { expenseId: string }) => {
    const { dictionary } = useDictionary();
    const { successNotifications, errorNotifications, buttons } = dictionary;
    const router = useRouter();
    const { data: expenseToEdit, isLoading } = useGetExpenseByIdQuery(expenseId);

    const { mutate: edit, isPending } = useEditExpenseMutation(expenseId);
    if (!expenseId) {
        toast.error(errorNotifications.staffNotfound);
        return null;
    }
    const onSubmit = (data: ExpenseSchema) => {
        edit(
            {
                ...data,
                amount: Number(data.amount),
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['expenses'] });
                    queryClient.invalidateQueries({ queryKey: ['expense'] });
                    toast.success(successNotifications.saved);
                    router.replace(ROUTES.expenses);
                },
                onError: (error) => {
                    console.error(error);
                    toast.error(errorNotifications.notSaved);
                },
            }
        );
    };

    if (isLoading) {
        return <Loader />;
    }
    if (expenseId) {
        return (
            <ExpenseForm
                defaultValues={{
                    category_id: expenseToEdit?.category_id,
                    amount: expenseToEdit?.amount?.toString(),
                    description: expenseToEdit?.description,
                }}
                onSubmit={onSubmit}
                isLoading={isPending}
                buttonText={buttons.save}
            />
        );
    }
};
