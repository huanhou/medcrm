'use client';

import { EditExpenseCategory } from '@/views';
import { useParams } from 'next/navigation';

const EditExpenseCategoryPage = () => {
    const { id } = useParams();

    if (!id) {
        return <div>Доступ не найден</div>;
    }

    return <EditExpenseCategory id={id as string} />;
};

export default EditExpenseCategoryPage;
