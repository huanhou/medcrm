'use client';

import { EditService } from '@/views';
import { useParams } from 'next/navigation';

const EditServicePage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditService id={id as string} />;
};

export default EditServicePage;
