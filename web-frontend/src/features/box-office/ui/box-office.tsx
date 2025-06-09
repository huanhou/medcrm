'use client';

import { useState } from 'react';
import { BoxOfficeForm } from './form';
import { BoxOfficeResult } from './result';
import { BoxOfficeSchema } from '../model/box-office-schema';

const staticDoctors = [
    { id: '1', fio: 'Dr. Serikbayev' },
    { id: '2', fio: 'Dr. Akhmetova' },
    { id: '3', fio: 'Dr. Omarov' },
];

export const BoxOffice = () => {
    const [formData, setFormData] = useState<BoxOfficeSchema | null>(null);
    const [resetFormFlag, setResetFormFlag] = useState(false);

    const selectedStaffName =
        formData?.specialist_id
            ? staticDoctors.find((s) => s.id === formData.specialist_id)?.fio
            : undefined;

    const handleFormSubmit = (data: BoxOfficeSchema) => {
        const processedData = {
            ...data,
            service_id: Array.isArray(data.service_id) ? data.service_id : [],
        };
        setFormData(processedData);
    };

    const handlePaymentComplete = () => {
        setFormData(null);
        setResetFormFlag(true);
        setTimeout(() => {
            setResetFormFlag(false);
        }, 100);
    };

    const handleServicesUpdate = (serviceIds: string[] | number[]) => {
        if (formData) {
            if (serviceIds.length === 0) {
                setFormData(null);
                setResetFormFlag(true);
                setTimeout(() => {
                    setResetFormFlag(false);
                }, 100);
                return;
            }

            setFormData({
                ...formData,
                service_id: Array.isArray(serviceIds) ? (serviceIds as string[]) : [],
            });
        }
    };

    return (
        <div className='space-y-4'>
            <BoxOfficeForm onFormSubmit={handleFormSubmit} resetForm={resetFormFlag} />
            <BoxOfficeResult
                formData={formData}
                selectedStaffName={selectedStaffName}
                onPaymentComplete={handlePaymentComplete}
                onServicesUpdate={handleServicesUpdate}
            />
        </div>
    );
};
