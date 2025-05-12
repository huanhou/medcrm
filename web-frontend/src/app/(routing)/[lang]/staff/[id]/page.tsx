'use client';

import { EditStaff } from '@/views';
import { useParams } from 'next/navigation';

const EditStaffPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Сотрудник не найден</div>;
    }

    return <EditStaff id={id as string} />;
};

export default EditStaffPage;
