'use client';

import { EditAppointment } from '@/views';
import { useParams } from 'next/navigation';

const EditAppointmentPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditAppointment id={id as string} />;
};

export default EditAppointmentPage;
