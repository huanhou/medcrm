import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { Table } from '@/features/appointments/ui/table';

export const ListOfAppointments = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='appointments' />
            <Table />
        </DefaultLayout>
    );
};
