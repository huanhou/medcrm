import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/expenses/ui/table';

export const ListOfExpenses = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='expenses' />
            <Table />
        </DefaultLayout>
    );
};
