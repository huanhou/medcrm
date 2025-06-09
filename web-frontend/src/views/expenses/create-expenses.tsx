import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreateExpenseForm } from '@/features/expenses/create/ui';

export const CreateExpense = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createExpense' />
            <CreateExpenseForm />
        </DefaultLayout>
    );
};
