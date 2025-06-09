import DefaultLayout from '@/app/DefaultLayout';
import { FinancialReportTable } from '@/features/reports/financial/ui';
import { Breadcrumb } from '@/shared/ui';

export const FinancialReportPage = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='financialReport' />
            <FinancialReportTable />
        </DefaultLayout>
    );
};
