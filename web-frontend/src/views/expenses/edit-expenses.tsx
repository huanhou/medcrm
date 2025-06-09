import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditExpenseForm } from '@/features/expenses/edit/ui/edit-expense-form';

export const EditExpense = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editExpense' />
            <EditExpenseForm expenseId={id} />
        </DefaultLayout>
    );
};
