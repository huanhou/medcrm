'use client';

import { EditSpecialist } from '@/views';
import { useParams } from 'next/navigation';

const EditSpecialistPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Специалист не найден</div>;
    }

    return <EditSpecialist id={id as string} />;
};

export default EditSpecialistPage;
