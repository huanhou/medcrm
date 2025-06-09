
"use client";

import DefaultLayout from '@/app/DefaultLayout';
import { Breadcrumb } from '@/shared/ui';

import { BoxOffice } from '@/features/box-office/ui';
import dynamic from 'next/dynamic';




const PageInTable = dynamic(() =>
    import('../../features/patients/ui/table').then((mod) => ({ default: mod.Table }))
);

export const ListOfPatients = () => {


    return (
        <DefaultLayout>
            <Breadcrumb pageName="patients" />
            <div className="mt-6">
                <PageInTable/>
            </div>
        </DefaultLayout>
    );
};