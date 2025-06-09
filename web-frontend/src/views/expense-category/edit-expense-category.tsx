import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditExpenseCategoryForm } from '@/features/expense-category/edit/ui/edit-expense-category-form';

export const EditExpenseCategory = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editExpenseCategory' />
            <EditExpenseCategoryForm expenseCategoryId={id} />
        </DefaultLayout>
    );
};
