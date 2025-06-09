import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/filials/ui/table';

export const ListOfFilials = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='filials' />
            <Table />
        </DefaultLayout>
    );
};
