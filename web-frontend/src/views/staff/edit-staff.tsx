'use client';

import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';
import { EditStaffForm } from '@/features/staff/edit/ui/edit-staff-form';

export const EditStaff = ({ id }: { id: string }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName='editStaff' />
            <EditStaffForm staffId={id} />
        </DefaultLayout>
    );
};
