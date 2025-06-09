import { useMutation } from '@tanstack/react-query';
import { deleteExpenseCategory } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
export function useDeleteExpenseCategoryMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {  // Change from single `string` to `string[]` to handle multiple IDs
            return await deleteExpenseCategory(ids);  // Pass the array of IDs to deleteExpenseCategory
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenseCategories'] });  // Invalidate the expense categories cache after successful deletion
        },
    });
}

