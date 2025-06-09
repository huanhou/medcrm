import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/transactions-history/ui/table';

export const TransactionHistoryPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='transactionsHistory' />
            <Table/>
        </DefaultLayout>
    );
};
