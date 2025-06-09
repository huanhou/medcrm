import DefaultLayout from '@/app/DefaultLayout';
import { ExpenseReportTable } from '@/features/reports/expenses/ui';
import { Breadcrumb } from '@/shared/ui';

export const ExpenseReportPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='expenseReport' />
            <ExpenseReportTable />
        </DefaultLayout>
    );
};
