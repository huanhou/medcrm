'use client';

import { EditFilial } from '@/views';
import { useParams } from 'next/navigation';

const EditFilialPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditFilial id={id as string} />;
};

export default EditFilialPage;
