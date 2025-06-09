import { useMutation } from '@tanstack/react-query';
import { deleteExpenseCategory } from '@/shared/api/generated';

export function useDeleteExpenseCategoryMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {
            return await deleteExpenseCategory(ids);
        },
    });
}
