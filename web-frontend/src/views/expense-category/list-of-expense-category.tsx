import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/expense-category/ui/table';

export const ListOfExpenseCategory = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='expenseCategories' />
            <Table />
        </DefaultLayout>
    );
};
