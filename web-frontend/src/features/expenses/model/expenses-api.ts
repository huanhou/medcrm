// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getExpenses, deleteExpense } from '@/shared/api/generated';

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
        mutationFn: async (ids: string[]) => {
            return await deleteExpense(ids);
        },
    });
}