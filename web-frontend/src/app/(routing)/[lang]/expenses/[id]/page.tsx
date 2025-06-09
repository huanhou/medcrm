'use client';

import { EditExpense } from '@/views';
import { useParams } from 'next/navigation';

const EditExpensePage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditExpense id={id as string} />;
};

export default EditExpensePage;
