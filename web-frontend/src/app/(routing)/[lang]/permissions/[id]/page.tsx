'use client';

import { EditPermission } from '@/views';
import { useParams } from 'next/navigation';

const EditPermissionPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditPermission id={id as string} />;
};

export default EditPermissionPage;
