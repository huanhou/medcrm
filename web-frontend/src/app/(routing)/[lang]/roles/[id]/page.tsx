'use client';

import { EditRole } from '@/views';
import { useParams } from 'next/navigation';

const EditRolePage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Роль не найдена</div>;
    }

    return <EditRole id={id as string} />;
};

export default EditRolePage;
