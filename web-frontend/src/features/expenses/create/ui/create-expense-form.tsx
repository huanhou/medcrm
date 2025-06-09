'use client';

import { ExpenseForm } from '../../ui/shared-form';
import { useState } from 'react';
import { ROUTES } from '@/shared/constants/routs';
import { useRouter } from 'next/navigation';
import { useDictionary } from '@/shared/lib/hooks';
import { toast } from 'react-hot-toast';

interface ExpenseData {
    id: string;
    category_id: string;
    amount: number;
    description?: string;
}

export const CreateExpenseForm = () => {
    const router = useRouter();
    const { dictionary } = useDictionary();
    const { buttons, successNotifications, errorNotifications } = dictionary;
    const [expenses, setExpenses] = useState<ExpenseData[]>([]);
    const onSubmit = (data: { category_id: string; amount: string | number; description?: string }) => {
        const newExpense: ExpenseData = {
            id: Math.random().toString(36).substring(2, 9), // random id
            category_id: data.category_id,
            amount: typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount,
            description: data.description,
        };

        setExpenses((prev) => [...prev, newExpense]);
        toast.success(successNotifications?.saved || 'Данные сохранены');
        router.replace(ROUTES.expenses);
    };
    return (
        <ExpenseForm
            defaultValues={{
                category_id: '',
                amount: '',
                description: '',
            }}
            onSubmit={onSubmit}
            isLoading={false}
            buttonText={buttons?.create || 'Создать'}
        />
    );
};
