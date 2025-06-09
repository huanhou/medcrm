'use client';

import { ROUTES } from '@/shared/constants/routs';
import { useExpenseCategoryTable } from '../model/use-expense-category-table';
import { useDeleteExpenseCategoryMutation } from '../model/expense-category-api';
import { GenericTable } from '@/shared/ui';

export const Table = () => {
    const { tableLogic } = useExpenseCategoryTable();
    const deleteExpenseCategoryMutation = useDeleteExpenseCategoryMutation();

    return (
        <GenericTable
            tableLogic={tableLogic}
            deleteMutation={deleteExpenseCategoryMutation}
            routeCreate={ROUTES.createExpenseCategory}
            routeEdit={ROUTES.editExpenseCategory}
            queryKey='expenseCategories'
            entityType='expenseCategories'
        />
    );
};
