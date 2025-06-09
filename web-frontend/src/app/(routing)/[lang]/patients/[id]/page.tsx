'use client';

import { EditPatient } from '@/views';
import { useParams } from 'next/navigation';

const EditPatientPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditPatient id={id as string} />;
};

export default EditPatientPage;
