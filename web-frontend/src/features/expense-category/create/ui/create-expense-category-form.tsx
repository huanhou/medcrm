'use client';

import { ExpenseCategoryForm } from '../../ui/shared-form';
import { useDictionary } from '@/shared/lib/hooks';
import { useCreateExpenseCategoryMutation } from '../model/expense-category-create-api';
import { CreateExpenseCategoryDto } from '@/shared/api/types';
import { queryClient } from '@/shared/api/query-client';
import { toast } from 'react-hot-toast';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';

export const CreateExpenseCategoryForm = () => {
    const router = useRouter();
    const { mutate: create, isPending } = useCreateExpenseCategoryMutation();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const onSubmit = (data: CreateExpenseCategoryDto) => {
        create(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['expenseCategories'] });
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

    return (
        <ExpenseCategoryForm
            defaultValues={{
                name: '',
                description: '',
            }}
            onSubmit={onSubmit}
            isLoading={isPending}
            buttonText={buttons.create}
        />
    );
};
