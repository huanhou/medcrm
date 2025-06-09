// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getExpenses, deleteExpense } from '@/shared/api/generated';
import { queryClient } from '@/shared/api/query-client';
// export function useGetExpensesQuery() {
//   return useQuery({
//     queryKey: ['expenses'],
//     queryFn: async () => {
//       return await getExpenses();
//     },
//     staleTime: 60 * 60 * 1000,
//   });
// }

// export function useDeleteExpenseMutation() {
//   return useMutation({
//     mutationFn: async (ids: string[]) => {
//       return await deleteExpense(ids);
//     },
//   });
// }

// В model/expenses-api.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { getExpenses, deleteExpense } from '@/shared/api/generated';

export function useGetExpensesQuery() {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            return await getExpenses();
        },
        staleTime: 60 * 60 * 1000,
    });
}
export function useDeleteExpenseMutation() {
    return useMutation({
        mutationFn: async (ids: string[]) => {  // Change from single `string` to `string[]` to handle multiple IDs
            return await deleteExpense(ids);  // Pass the array of IDs to deleteExpense
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });  // Invalidate the expenses cache after successful deletion
        },
    });
}
