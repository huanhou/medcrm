import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { CreateExpenseCategoryForm } from '@/features/expense-category/create/ui';

export const CreateExpenseCategory = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='createExpenseCategory' />
            <CreateExpenseCategoryForm />
        </DefaultLayout>
    );
};
