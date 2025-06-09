import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/services/ui/table';

export const ListOfServices = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='services' />
            <Table />
        </DefaultLayout>
    );
};
