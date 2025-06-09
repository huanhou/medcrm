import DefaultLayout from '@/app/DefaultLayout';
import { VisitReportTable } from '@/features/reports/visit/ui';
import { Breadcrumb } from '@/shared/ui';

export const VisitReportPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='visitReport' />
            <VisitReportTable />
        </DefaultLayout>
    );
};
